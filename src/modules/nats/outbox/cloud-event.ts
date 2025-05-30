// https://cloud.google.com/eventarc/docs/workflows/cloudevents
export interface CloudEvent {
  id: string
  time: string
  contentType: string
  source: string
  type: string
  specVersion: string
  data: object
}
