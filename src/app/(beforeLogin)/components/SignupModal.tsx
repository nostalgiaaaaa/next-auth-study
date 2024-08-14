'use client'

import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import style from '@/app/(beforeLogin)/components/login.module.css'

export default function LoginModal() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const res = await fetch(`/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
    if (res) {
      toast('회원가입 성공', {
        description: '성공적으로 가입했습니다.',
        action: {
          label: 'Action',
          onClick: () => {},
        },
      })
      router.push('/')
    }
  }

  const onClickClose = () => {
    router.push('/')
  }

  const onChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value)
  }

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button
            className={style.closeButton}
            onClick={onClickClose}
          >
            <svg
              width={24}
              viewBox='0 0 24 24'
              aria-hidden='true'
              className='r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03'
            >
              <g>
                <path d='M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z'></path>
              </g>
            </svg>
          </button>
          <div>회원가입</div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label
                className={style.inputLabel}
                htmlFor='name'
              >
                닉네임
              </label>
              <input
                id='name'
                className={style.input}
                value={name}
                onChange={onChangeName}
                type='text'
                placeholder=''
                autoComplete='off'
              />
            </div>
            <div className={style.inputDiv}>
              <label
                className={style.inputLabel}
                htmlFor='email'
              >
                아이디
              </label>
              <input
                id='email'
                className={style.input}
                value={email}
                onChange={onChangeEmail}
                type='text'
                placeholder=''
                autoComplete='off'
              />
            </div>
            <div className={style.inputDiv}>
              <label
                className={style.inputLabel}
                htmlFor='password'
              >
                비밀번호
              </label>
              <input
                id='password'
                className={style.input}
                value={password}
                onChange={onChangePassword}
                type='password'
                placeholder=''
                autoComplete='off'
              />
            </div>
          </div>
          <div className={style.modalFooter}>
            <button
              className={style.actionButton}
              disabled={!name || !email || !password}
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
