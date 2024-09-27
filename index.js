const express = require('express')
const app = express()

// Instantiating formsg-sdk without parameters default to using the package's
// production public signing key.
const formsg = require('@opengovsg/formsg-sdk')()

// This is where your domain is hosted, and should match
// the URI supplied to FormSG in the form dashboard
const POST_URI = process.env.POST_URI;
// Your form's secret key downloaded from FormSG upon form creation
const formSecretKey = process.env.FORM_SECRET_KEY
// Set to true if you need to download and decrypt attachments from submissions
const HAS_ATTACHMENTS = false

app.post(
  '/submissions',
  // Endpoint authentication by verifying signatures
  function (req, res, next) {
    try {
      formsg.webhooks.authenticate(req.get('X-FormSG-Signature'), POST_URI)
      // Continue processing the POST body
      return next()
    } catch (e) {
        console.log('error here!', e)
      return res.status(401).send({ message: 'Unauthorized' })
    }
  },
  // Parse JSON from raw request body
  express.json(),
  // Decrypt the submission
  async function (req, res, next) {
    // If `verifiedContent` is provided in `req.body.data`, the return object
    // will include a verified key.
    console.log("What is the Body? ",req.body.data);
    const submission = HAS_ATTACHMENTS
      ? await formsg.crypto.decryptWithAttachments(formSecretKey, req.body.data)
      : formsg.crypto.decrypt(formSecretKey, req.body.data)

    // If the decryption failed, submission will be `null`.
    if (submission) {
        console.log(submission)
      // Continue processing the submission
    } else {
        console.log('unable to decrypt')
      // Could not decrypt the submission
    }
  }
)

app.listen(8000, () => console.log('Running on port 8000'))
