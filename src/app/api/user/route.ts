import * as bcrypt from 'bcrypt'
import prisma from '@/app/lib/prisma'

interface RequestBody {
  name: string
  email: string
  password: string
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json()
  console.log('$$$$$: ', body)

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  })

  const { password, ...result } = user
  return new Response(JSON.stringify(result))
}
