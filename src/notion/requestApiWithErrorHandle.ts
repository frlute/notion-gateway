import * as notion from '@notionhq/client';

export async function requestApiWithErrorHandle(callback: any) {
    try {

    } catch(error: unknown) {
        if (notion.isNotionClientError(error)) {
          // error is now strongly typed to NotionClientError
          switch (error.code) {
            case notion.ClientErrorCode.RequestTimeout:
              // ...
              break
            case notion.APIErrorCode.ObjectNotFound:
              // ...
              break
            case notion.APIErrorCode.Unauthorized:
              // ...
              break
            // ...
            default:
              // you could even take advantage of exhaustiveness checking
              // TODO
              //   assertNever(error.code)
          }
        }
    }    
}