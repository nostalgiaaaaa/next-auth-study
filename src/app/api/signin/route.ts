import * as bcrypt from 'bcrypt'
import { signJwtAccessToken } from '@/app/lib/jwt'
import prisma from '@/app/lib/prisma'

interface RequestBody {
  email: string
  password: string
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json()

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user

    // 토큰 생성
    const accessToken = signJwtAccessToken(userWithoutPass)

    const result = {
      ...userWithoutPass,
      accessToken,
    }

    return new Response(JSON.stringify(result))
  } else return new Response(JSON.stringify(null))
}
