import { env } from '@shared/environment'
import { AutotaskClient } from 'defender-autotask-client'

export default function autotaskJob(req, res) {
  const value = req.body.value
  // console.log(process.env.TEAM_API_KEY)
  console.log('aegwagaewgewgea', value, env.autotask.apiKey, env.autotask.apiSecret)
  const client = new AutotaskClient({
    apiKey: env.autotask.apiKey,
    apiSecret: env.autotask.apiSecret,
  })
  const handleClient = async () => {
    const currentTasks = await client.list()
    console.log(`currentTasks:${JSON.stringify(currentTasks)}`)

    // update the autotask
    // const autotask = await client.update({
    //     autotaskId: "fa2b0fb5-7527-40ad-a08b-aa0ab94819f3",
    //     name: "mumbai-autotask-1",
    //     paused: false,
    //     encodedZippedCode: ""
    // })
    const autotaskId = 'fa2b0fb5-7527-40ad-a08b-aa0ab94819f3'
    // await client.updateCodeFromFolder(autotaskId, './relay_folder');

    await client.updateCodeFromSources(autotaskId, {
      'index.js':
        `
    const { Relayer } = require("defender-relay-client");
    exports.handler = async function (credentials) {
        const relayer = new Relayer(credentials);
        
        const txRes = await relayer.sendTransaction( ` +
        value +
        `
    
    );
        
        console.log(txRes);
        return txRes.hash;
    };`,
    })

    // run the autotask
    const runResponse = await client.runAutotask(autotaskId, { foo: 'bar' })
  }

  console.log(`runResponse:${JSON.stringify(runResponse)}`)
  res.status(200).json({ data: runResponse })
}
