'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

import Skeleton from '@/app/components/Skeleton'

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues/list' },
]

const AuthStatus = () => {
  const { data, status } = useSession()

  if (status === 'loading') {
    return <Skeleton width="3rem" />
  }

  if (status === 'unauthenticated') {
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    )
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={data!.user!.image!}
          fallback="?"
          size="2"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2">{data!.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Logout</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
              // 'text-zinc-500': link.href !== currentPath,
              // 'hover:text-zinc-800 transition-colors': true,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

export default Navbar
