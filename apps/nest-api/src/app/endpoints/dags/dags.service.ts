import { Injectable } from '@nestjs/common'
import { Field, InputType } from '@nestjs/graphql'
import axios from 'axios'

@InputType()
export class SearchDAGInput {
  @Field({ nullable: true })
  name: string
}

@Injectable()
export class DAGsService {
  client = {
    username: process.env.AIRFLOW_USERNAME,
    password: process.env.AIRFLOW_PASSWORD,
    baseUrl: process.env.AIRFLOW_ENDPOINT_API
  }

  async triggerDAG(dagId: string, conf: any) {
    const { username, password, baseUrl } = this.client
    console.log(`${baseUrl}/${dagId}/dagRuns`)
    const url = `${baseUrl}/dags/${dagId}/dagRuns`
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
    const res = await axios.post(url, { conf }, { headers })
    if (res && res.data) {
      return { result: res.data.dag_run_id }
    } else {
      return { result: '' }
    }
  }
}
