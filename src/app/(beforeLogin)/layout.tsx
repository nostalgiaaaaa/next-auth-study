import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import styles from '@/app/page.module.css'

type Props = {
  children: ReactNode
  modal: ReactNode
}

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      <Toaster
        toastOptions={
          {
            // unstyled: true,
            // classNames: {
            //   toast: css({ bg: 'white' }),
            // title: 'text-red-400',
            // description: 'text-red-400',
            // actionButton: 'bg-zinc-400',
            // cancelButton: 'bg-orange-400',
            // closeButton: 'bg-lime-400',
            // },
          }
        }
      />
      {children}
      {modal}
    </div>
  )
}
