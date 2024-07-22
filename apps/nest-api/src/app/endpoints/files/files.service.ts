import { Injectable } from '@nestjs/common'
import { Field, InputType } from '@nestjs/graphql'
import * as Minio from 'minio'

@InputType()
export class SearchFileInput {
  @Field({ nullable: true })
  name: string
}

@Injectable()
export class FilesService {
  client = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: Number(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
  })

  async getPresignedURL(bucket: string, key: string) {
    return this.client.presignedPutObject(bucket, key)
  }

  async getCVFiles(bucket: string) {
    // const res: Minio.BucketStream<Minio.BucketItem> =
    return this.client.listObjectsV2(bucket)
  }
}
