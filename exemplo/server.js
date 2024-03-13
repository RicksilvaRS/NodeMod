//import {createServer} from 'node:http'
//const server = createServer((request, response)=>{
//response.write('oi')
//return response.end()

//})

//server.listen(3333)

import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()
const database = new DatabaseMemory( )
server.post('/video', (request, reply)=> {
    const  {title,description,duration } = request.body 
   
    database.create({
        title,
        description,
        duration,
    })
  
     
    return reply.status(201).send()
})
server.get('/video', (request) => {

    const search = request.query.search

  const video = database.list(search)

  return video
})
server.put('/video/:id', (request, reply)=> {
    const videoID = request.params.id 
    const  {title,description,duration } = request.body

database.update(videoID, {
        title,
        description,
        duration,
    })
    return reply.status(204).send(  )
})
server.delete('/video/:id', (request, reply)=> {
    const videoID = request.params.id

    database.delete(videoID)

    return reply.status(204).send()
})
server.listen({
    port: 3333,
})