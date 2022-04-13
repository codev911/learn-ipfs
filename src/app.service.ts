import { Injectable } from '@nestjs/common';
import * as IPFS from 'ipfs-http-client';

@Injectable()
export class AppService {
  ipfs: any;

  constructor(){
    this.ipfs = IPFS.create();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getHash(data: any) {
    const { cid } = await this.ipfs.add(data);
    return {hash: cid.toString()}
  }

  async getFileHash(path: string) {
    let hash = [];
    for await (const file of this.ipfs.addAll(IPFS.globSource(path, '**/*'))) {
      hash.push({
        path: file.path,
        hash: file.cid.toString()
      });
    }

    return { result : hash }
  }
}
