import { Footer } from 'flowbite-react'

export default function Foot() {
  return (
    <Footer className="shadow-none px-2 mx-auto w-full max-w-[1280px] rounded-none">
        <Footer.Copyright href="#" by="Mind Matters™" year={2024} />
        <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Terms of Service</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
    </Footer>
  ) 
}
