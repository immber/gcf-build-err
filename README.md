See issue https://github.com/GoogleCloudPlatform/functions-framework-nodejs/issues/591

## Requirements

### Node

    $ node --version
    v20.0.0


### npm installation
  After installing node, this project will need to install dependencies, so just run the following command.

      $ npm i


## Running the project

    $ npm run start

### Expected behavior

Able to deploy with
```
gcloud functions deploy my-function \
    --gen2 \
    --region=us-central1 \
    --entry-point=create \
    --trigger-http \
    --set-build-env-vars GOOGLE_VENDOR_NPM_DEPENDENCIES=true
```

### Result

Get error:
```
ERROR: (gcloud.functions.deploy) OperationError: code=3, message=Build failed with status: FAILURE and message: An unexpected error occurred. Refer to build logs
```

Error in Build logs is:
```
Step #2 - "build": panic: runtime error: invalid memory address or nil pointer dereference
```


### Workaround
Build docker container manually and push to artifact registry, then deploy new CloudRun revision

```
pack build \
  --builder gcr.io/buildpacks/builder:v1 \
  --env GOOGLE_FUNCTION_SIGNATURE_TYPE=http \
  --env GOOGLE_FUNCTION_TARGET=create \
  --env GOOGLE_VENDOR_NPM_DEPENDENCIES=true \
  my-function
```
