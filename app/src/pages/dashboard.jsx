import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { useEffect, useState } from "react"
import { Button } from "src/components/Button"
import { PostForm } from "src/components/PostForm"
import { useBlog } from "src/context/Blog"
import { useHistory } from 'react-router-dom'



export const Dashboard = () => {
  const history = useHistory()
  const [connecting, setConnecting] = useState(false)
  const { connected, select } = useWallet()
  const { user, posts, initialized, initUser, createPost, showModal, setShowModal, } = useBlog()
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [postNFT, setPostNFT] = useState("")

  const onConnect = () => {
    setConnecting(true)
    select(PhantomWalletName)
  }

  useEffect(() => {
    if (user) {
      setConnecting(false)
    }
  }, [user])

  return (
    <div className="dashboard background-color overflow-auto h-screen">
      <header className="fixed z-10 w-full h-14  shadow-md">
        <div className="flex justify-between items-center h-full container">
          <h2 className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br from-indigo-300 colorpink"
            >
              SOLIFY  
            </div>
          </h2>
          {connected ? (
            <div className="flex items-center">
              <p className=" font-bold text-sm ml-2 capitalize underlinepink">
                Home
              </p>
              <p className=" font-bold text-sm ml-2 capitalize mr-4 underlinepink">
                Blog
              </p>
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
              />
              <p className=" font-bold text-sm ml-2 capitalize">
                TANMAY
              </p>
              {initialized ? (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    setShowModal(true)
                  }}
                >
                  Create Post
                </Button>
              ) : (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    initUser()
                  }}
                >
                  Initialize User
                </Button>
              )}

              {initialized ? (
                <a href="https://opensea.io/" ><Button 
                  className="ml-3 mr-2"
                >
            
                NFT Marketplace  
                </Button></a>
              ) : (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    initUser()
                  }}
                >
                  Initialize User
                </Button>
              )}

            </div>
          ) : (
            <Button
              loading={connecting}
              className="w-28"
              onClick={onConnect}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
              Connect
            </Button>
          )}
        </div>
      </header>
      <main className="dashboard-main pb-4 container flex relative">
        <div className="pt-3">
          {/* <h1 className="title">The Blog</h1> */}
          <div className="row">

            <article className="best-post">
              <div
                className="best-post-image"
                style={{
                  backgroundImage: `url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhIVFhUXFxUVFxcWFRUVFhcVFRYWFxgXFhYYHSggGBolHRUVITEiJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKcBLwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAQIDBQYAB//EAEoQAAIBAgMEBgQJCgQGAwEAAAECAwARBBIhBTFBUQYTImFxgTKRkqEHI0JSU2KxwdEUFTNUcpOi0tPwFkNzgjRjg7Lh8SSjswj/xAAaAQACAwEBAAAAAAAAAAAAAAADBAECBQAG/8QAOxEAAQMCAwQHBgUEAgMAAAAAAQACEQMhBBIxQVFhkRNxgaGx0fAFIjJSweEUI4KS8TNCwtKishUkcv/aAAwDAQACEQMRAD8A80ViKez3FjuoYPXFq9TKDlUrtUzYhSRYW50GDrfnSqL1wBJBVxYELSbMkq6ieshhMZkIBvqbXG7XnWgwuIuKcpvBWbXpmZQu2diB7vELPvK7g3eOTe4/blZb3N73vrfffje/Gt4Jqxu2V+Ocjib+ug12ADME3gqrjLXKtcUlqlZP78d1cFrPc26fTAKfGxBBBsRTsldlojWgrtEsqjeNx4cjxFNUUop6LR201IKVVqZIqdHHR0GHvROjTFO6GSGp0w9W+E2aW3CtDs7olNJqsbEc7G3rOlUfDBLjC0adK0mw4rGDC0v5JXoq9ELenJAvcZEJ9167/CiHdPAf+rb7RQOnpfN4o2Wl83ivNmw1QvBXpE/Qqa11TMOaESD+Ams7jdisu9TRWOY/4SChupAj3TPUslJFUDpV3iMGRVfLFRsizqohVzLUZFFSJaoCtUNNKkqPJTCKMgRicq7z4D3mhytBc28KYtKaqkmwFydABqSTwFHNJ1QKKe2wtIw4DjGp/wC4jfuGl80efqxYemdCfmA7wPrHieG7nROy9m5wXa4Xhbex7r8KUdTzm+nirU2lxgKv36Cth0XgKplUEs53AXJO4ADjVVs/YUssqwxIXc+QAG9ifkqOZrcYTGRYJerwzCWe1nntdU5rBf8A7/7BXVcjsjRLt24bydg7zsBTVBpY6YureGCHAgPOFlxO9Ib3WLk0vNu7/wBjM7a2jLO5klcsx9QHJRwFRSzE3JJJOpJNyTzJ4mqjHY4AgakncBUspBhzvMu3/Qbh47SU0Ybd1yocVJagxJelkudTUuGwbSAkWCDRnY5UXuLc+4XPdUvcAJJgJclMuBrRC4ZiAzsI1O4te7fsqNSO/dTkljj0iXOw/wAx17I/04j9rXPcKFlLMSzEsTvJNz76XzudpYd/LZ28lGcKuEgPpDzH4caVl4ggj3+YoMPS3o7baFZ5M6hTXp2aoAaXNRQUOFY4WfgasY5SNQao4zRkMxG6jsedqBUpyrv8sB/81T45QWvR2y9nPiCVUi4AYkkjj3d9V+JjKuUbepKnxBtXdM1xLJuAr08M5jRUixkK5xmEWWNFOjKoCtxHceYqgOFZWysNf73VcJIbDWo8Y1176riKYdJGqrh3FhynTwQs2zXVVYqQGvY87b6CaOrjC4hyAjXZPm33Hmp+Sf7N6j2lgih5jgd3rHA0rQJmCnXkbFUFamiSuy0XhIb1r06cpd1SFPhMPetr0Y6LPOb2so3sdAB40nQ3o51zXbSNdWbkKuOlHSlVX8nw3ZiXTTe3eaVxNV2foaPxbTsb9+HNFwuJaXI7E43B4MZYlEsg+W3aUHuXj51mtq9LJZPSckcr2A8ANKo5ocQ4zCJyDqDlbUHjQT7LxR/yJPZNLCnSYZJl28mStRuMpNMyJ4kT5DsCOk2u3OmDax50Adj4v9Xk9g1w2Ji/1eT2TU9Oz5hzRP8AyTPnH7h5q8we33QgqxB5gkVqcD0tWUBMSgkG7OdHHg3Hzrz1djYv6CT2T+FEQ7NxY/yJPYP4VR3QVPiInfIB5ob8dRdcub+5s85W82v0WSVDNhWzrvK/KXxFefbRwJUkEVqej+LxkDhlik7xkaxFaDpHshMVF+URIUkAvJGQR5gVajieheGVHBzToZEjgY8eaz8Ti6ZEhwPaJ7tV43NHQzJV/jMJY66c6qsUbkmwHcOFaj2JZjw66BK11rbqIWO9Gy7IdVJkBUjQKRY37xwFJ1ANE2ym5wkKpw8V2A4X18K2mysGZFOoSNLZ5G0RAd270mPBRqapNmYFR8bMSseoAFuslI3iMHcObnQd50o7FbRaTKtgka+hGt8q9/NmPFjqfdSRJcSGdp3cOJ7hqdyZoDKEdtXa4CnD4YGONvTY262e30hHopyQac70FHMFFV+JfW5OtMFiQSd1/DX7aKym2mIbt13k7ydp/gQLK4dBMI6TFEmwqIgk5VGZuQ+0ngO86ChhNam5nkIjQMSx9BASWPDQXLnx8qhxIFvsPXoqHVFP1kSelaZ/mqSIV/acWaQ9y2H1jSdZJO6r2nb0URF3fVjjQaeAFELsqKHXFylW+ghyyTeDv+jh8yzfVqYbdexiwsYw6NoRDmMrj/mzntuO4ZV7qQL595tz8x07PsNNTN0tJdornZWycNh3Bx72I34eMiSbwkynLFw0LZu4VWbYaBpWMCMsZJygm5A4XpmydktKcqq0hG9YQGC/6kp+LjHiTWi2cuAgb/5M4Y6/F4S0pH7eJeyX+qnKs2pUh8gknl9/od6K2nf3jfvWRTomJiBg8RHLc6ITkfXuP/iq/b/RzEYNwk6ZSRcEeifA1VwylSGUkEG4I0II41fL0xxpPblMotbLIodSOViKb6PFseCxzXN2g2PMCD+1UzUHi4jqv4nuWfBp16vTtDBy/pcMYm+fh2FvOJ9PUajOwlf/AIbERS8kY9TL4ZX0byNMtxUf1GlvE3HMSOZCGaM/AQfHkb8pVSjUSkovyqPF4KSJsssbIeTKVv4X3+VR3Fhvvrfl3W99P0qgIBB8ku5pVnBi3jOaNypta4PChJGJNybk6kneSahU0pajFrdYXS6I2KywUmlr1Lj1K6HfYHQg6EXGo7jVfDJaueWpVIEyrbZViMp4mm41mibKxzqwuL77f3/Y4QbNmsaKxJDyx31A3jzphtNpAQC9zXncgXi1uDdT/etXWxMGXZVA1JAoTF4LIwKnsnhy7q3Hwc4MdaZWHZiUsfIaUxWqChQc/cl61TMPd2q36SYwYPDrhYz2iB1hHMishs7A5j1souN6qeP1mHLkOPhvZtva4fENJIMwzE2+zfv4aVA/SuIfIk/g/mrN6GrSo5QLm7jxKmgwlshaUPUivWT/AMZw/RyfwfjSjpvD9FJ/B+NZj6JGxc7CuOgWvV6er1jh06h+il9afjTh08h+hk9a0u6kdyA7A1PlWzV6lWSsQOn8P0MntLT16fxfQSe0n4UI4V7tAln+z63y+Hmtjj9pxwRmSQ2A0AG9m4Ko4n7N9UmwOl0n5R1jnstpk+SE5d/jWD2vtqTEyZ30A0RR6KryHM8zx9QE2BnsRWzgfZVJrD0glxHIbh58rJmnghRbJ+Lfu6vW5bnp3skI/WJ6EguvieFee4lNa9Uwz/lWzWB1aGxHgdK88mitIviPtrRwL3Gkab9WmPLuRsOTMevUygXheLKbWZtVPIcx9bv4eO66xUgCXIzWtYHd593dUO1jcr3UPjMR2bUOozavRMhmYDRV7yszFnJJ0F+4bgBuA7hRAk0oB3p6yGxoBbCqx8Jp38/GpBQ2fWpFzMbAEnkASfUKgCyjMis0YHaJP1Utc+LHRff4Uj7WcArGBEh0IS4ZhyeQ9ph3Xy91NGGRb9bKBb5CDrHOtrXByL5tccjR2xMVG06RoY8MpNjiJAJZEsCb5msqE7rqF376TrvZlLiJAvw7NZ/SHHcqF0qEbLkKh3ywxnc8xKAj6iWLyf7FNSri8LELIjYlvnS3jhvwtChzP/vcfs1V7RPxrnrTL2mHWkkmQKbB7sb6gA607B4CWQZkRiOLbkHi7WUeulnNloc8wP29+veOO5ddxRmN2zPMoR3+LG6JAI4V8IkAXzIv31BHepBhok/STqT82EdafbNkHkTS/l8a6RxDxkOcnyFlHqNB90iGCR1QPv1347EdrY1MJuKwuz2F4J5ozf0J4w38cegFV0mz2Hosj96MCfUbGgRTwKba0jR3O/kUlI3JxQjQgjx0pKeL04gjTnbhw3ijtO5RCLwm2J41yLISnzGs8f7twV91SnFwP+kgyH50JyjxMT3U+ClBVZalrugZJIEHeLHtjXtkLsxRxwan9FKrbuy3xb69zHKfJjUE0TKbMpU94Iv4c6hqVJmAsCbct6+anSmW5htnr+1u5VTQ9GbQeLs9V57/AC38d9Au3cPKmXqwEuB3Kc0AhGYeS1TxzdoHvquVqnifWtCkEs4K/ebNavQej/xez8VIN7ZFHnqa8vw8lelbLmvsuW3CWO/gVNR7Sb+Uwb3N8Qs6q2O/wWDZo2kAlYqhJuRbTlqQbC/G1WL9GoDxl9tP5KpNpC5JHEn7aI2FtzJaKU9ncGPyO5vq/Z4buxTHQHAnq9d60sNliCFY/wCFMP8AOm9tP6dcOiOG+dN7cf8ATq3p4asx9MnfzPmmXscFTjodhfnT/vI/6dPHQvC/On9uP+nVwGqQNS7qJS7842qkHQrC/On9uP8Ap08dCML8+f24/wCnV4rU9WoRDxoSlXvqfMV5ztzYz4V7HtI18j2sGHI8mHEfdUGFevS8Vh0lQxyLmVt44g8CDwYcDWE2lsdsNIATmU3KNzAtv5MLi4rWwGIznI7Xx++9WZU6T3XarffBw+YSxnc8Ugt4C/3VkNqG0nga03wayfH9wSQnwCNWS2xLd28TR8M3/wBqqOA+vkuADXwPWnmhcbiL2oN5dKZM9Ds1EqthaIqEpWanO66Wvu7V7elc+jbha3vocmuvSL1Icpb04ym1rm3LgfHnUQNIarsUyU/IfsO8DfU0axj0nJ7kH2s1reQNCU6gPk7VwKsE2iq/o4kX6zjrnvw9PsDXiFFD4nGSSm8js/LMSbeA3DyqMJSlKWLGNdMX3m55m/erydFGDS3riKVkIJB3jvB94qpgKLoULUqpUYpyGrE7EMK12Vs3rnCB40JvrI4RBYE6sdBu9ddtHZUkYzNkKk5QySxSAn/YxtuoFZLVxN6EBUzzNt0T9R4FFJbEQoytdap8VhJI7CRHQkXGZStxzFxrQ4NN06gcJBlCIuuApa4UtMNKqmNTKV6bVmm6gp4NOQ0wUop+iUJyOgkr0LofP1mExkHExiUf9JgT/CW9VeaI1abohtn8nxCSHVb2cc0YFXHsk09iaRrYchuouOsGfolarFW4prGq+axq86V4DqcQ8d7qDdW4MjAMjDuKkHzoTZOy+sOZ9EHrbuHd3/2IqZXUw8bUxhqTqhDWi6Bi2liFACTShRoAsjgDwAOlcdq4r6fEfvZPxrcRzFQApIA0ABsAO4CpBim+c3tGsWphJM25LUOCLdvcsD+dcX+sYj97L+Nd+dsZ+sYj97L+NegjFv8AOb2jTxi3+e3tGlnYI8OX3Q3UCNq89G18Z+sYj97L+NPG18Z+sYj97L+NegjFP85vaNPGKb5ze0aqKGXYD2IDmELAJtbF/rOI/ey/jSz4yRyOsdnI3Z2ZrX5Zjpur0E4wgFmkIUC5JY2A51jNvbYOJkW18iXCX9I3tdjyvYacPWa08AMz4DBA1I/hAcdkLU9BZOrixU53JCyD9qUhB7i3qrGY6a5NabamI/J8DFh/lzEYiTuTKViU+ILP/vWsXNJen8JTvUrbzA6hbxkpZlzKbI1Qk1zGmmgVjdNNTr05ltY6ai4sQdLkagHsnQ6GxtY7iKivXCs2pqjBTKaKlEbLGsUb9ZY9Z8q7XFsoG7jQQpwY6679/f41RwmDOnq6uCjBsubioT/UdYv/ANGFT/m+IHtYmEDkOskb+BCv8VVgQ2vbS4F7aXNyBfnofVSB9LcLg+Yvb7TSr2vP90dQ85Ugq6iXBqe088n7EccY9pmc/wANJtbEQMR1EbRoABZ3EjFuJLBV7tLVTq1cXpfob5i4nrPlARA9PdhToZkHpR5v9xUeoUOTSquhNwLW04m/Lwq5AFj9foqSUwXorAoA6mQdkMAQfvFDAU9iTqSSeZ1NUcC4EKGuykFaHpC8JjGTLm4ZbbuO6qXCTZHVwBdWVgDqOyQQD3aUPS3qmHw3RtyTP3Ra9c1X5ohaXpb0oOMEY6oIEufSzElgBvsLDSsyFrr1wNHw2GZQpinTEAIL3l5lyeEo/A7HmmB6qMvlte1tL7uPdQboRYnjSGTS1MXj3VWEdJ0axn6vJ6qr8ZgZYiBLGyE3tmBF7b7VE9uQ9VR2qaZfNyOX3VSF1OFNpwrQpuQyE8URE1CipUNa2GrQh5VsMC64yJYnv10AOS2+WAXYxjiWQ3Yc1LAbhTRj4gLBrDh2G3eqqDCSlWDKSCCCCDYgg3BB4GtmcHHjhmiCpiOKCyrKfnRjcGPFeO8cqFXy0TP9h/4nb2HfsPDTY9mhzWuDY7fCZ08FV/nSH5/8D/hSjasP0n8L/wAtV2K2eykgqRbQ3FiDyI4Gg2w9Be06tKaeawMEDkr8bWg+kHsyfy04bWw/0o9iT+Ws2YKTqKWLX+ggkPK1A2vh/pR7Ev8AJT12xh/pR7Ev8lZYYep48ITwqW4cu1PgqdC92xTbY2m0xyi4jB0HFj85u/kOHvp+w8ClzPOD1MZBPAyPvWFfrNbXkoY1bbK6PAr1s56uIcW3krwQfLf3DiRVd0h2gJCqIuSKMEIg1tfeSflM1hc9w4AU5SIP5NLTad2/9X/XU6Qg4jBFjJJv69cFW7Y2i88jyyG5Y3NtAOQA4ACwA5AVWMafIaiamqtRrGhrbALNywkJpppTTayqr5VwupVriD6//X3U9TuN/VvFZ9RyM1PRb00rR8m05pFyPLI4vcB3ZhmsRftHQ2J9dBZqEwuI94cr+IHgrmNijIpztfXW5uSSb3vSE11cWyVC6mGnmm0NzV0pZGBJIFhyve3maaxpaYaFBC5FLHTurouHDk0e+yJRb4t7sLqApJI7gBrS34ljbEq2VUZSky1ef4axZF/yeRRzkHUj1ylRTPzFb9JicKnd1plYeUCuPfV2Y2hseD1GTyEnuVCFS5aTLVycLhF9KeWTuigVB7Urg/w1DJPhh6GHduRllJ9axon2003EA/CDyj/tlXdirDXWouTGn5McSeCBvfKWPvoSRyd5vRQ87VwT4YsxAuBfidAPGpZMJGL5p1PciyMT5sFHvoItTCaG2Z1VnERCmfq+GY+Nl/Goyab404Cn6eZAK4VKtRgU9TTVNxC4BExNVjg8SQezVUtER042sdqdoPLDIW7w231lAXEoHsLB72kA/b1uByYN5VK2xcNJrDOg5CW8TesXQ+0KxuHzd3tAffRkE7cPtFLmg3WmcvhyP0hbNKsC3d4ctB+mFoP8ITk2SPN3owkH/wBZNJ/gvE/KgkHihA9ZqpTHtz99SDFSEXysR5kVHR1/mbyP+yYAadI/af8AZWydF1AzSywJ3NIGPksWZvspz4jCYcdhOtbnIMqeUYN28z5Vn5MRLyb1UG4kPySfI1P4dx/qOJ4Cw8+yY4Kj3ho29ggfU9hdHBGbX2xJM12Y23DgAOQA0UdwqimepZVNCyUcPyNytEAblkYh5fqoXqI1IxppNKvqErOLVEaSpQOYPiKljgB3Wbuvlb36HyvSb6i5rJQtOFSNCQbEEHkRY0pSk3vlFFMxolCdm9xvta+vO9uVIaQVI6W9QOhvv++pbUERKjKVHSjjp/4rrUrUTMCoUdNNPIppFUcVCbSGlNcaGXBcvQV2bh4iOtx8NxwgSTEephlX31dbV6dI0SxI+LYIoUWkjwq6CwJ6sM59Yrz8vGN7MfCwHvuaheccFrAHswu/rOA6z9GguR3OGxE7Rx3WOXta/Aszn2m1NAPKa55eVQsK0WMawBrTPYqEkm6VnphemsKQUYEzColz12pvpu1NhuHM+seukA1sBqdABvPhRLYIqPjLJxsdXtb6Majxaw76IXhtiVyCNX/QHYK47Hw4ZyRGSzPbQlEUsQDwJsBfvqmcrawBPebD3DXyuaN6ObclwWJixMVi0bE5TorKQVZTbmCRfhvqzvgOU3i0fU2jvVHTuXr+3uk+w8BO2DOzFdosoYrh4GFyoa2aQ5mNiLk1WTfCTsTKcmyQWscobD4VVLcLkEkDvsaJxfwgbAxRE2KwLGUgBs8CO2nDOG7Q5E+6iNnY/o3inSBcEqNKRGhaHq7s2gAZTcEk2B50gyhIk03mLkjx08UGV43tHGNiJnk6tFMjXEcSBEXcAqIu4WA8d9e17G2dgNnbIixeJwaSyMqM+eON5Gkk3KC+iqPsB3nf5r076NHZ+PaGIsyFVkiN7MqPmFmYW1BVhfiAK9C6WIW6N4UE6kYe5B45W41qVKTawoATle4C0i3b5lcXCOPrtQcPwg7LY2XY0d/9PDfy1plw2Ax+z55IsKsDor3yIkciuiZx2oxqCCNO86V4dDgbH5XtWr2X4NIguy8YLcZb3N7/APx0vrRsf7OpYSiKlLMDmG0+SNSEtzDeFn/g/wBkg41OtUunxnZciVD2Wt2SOH2+FXW3cCgxUgCWUNoFCAbl3C4trSdCMUGx0ai25zp+w1qA6b4/LjZl5MPsWiOY9+NLRb3P8l6UUsuLLQY9z/LqjuRkMeGBIs5PjHb7dKkwWy8LJOilHJZ1vcqQQTc3bwvurGnaBvxq16LwxnaWHk7WcsG36b5FGngBV6+GqUmudmPwuPISiYgFjCWumx2xoJ3Fei7STBwtkXAQPYC/xcQtcXt6JJ0tVXJtDBgjNszD5bi56uIkDiQCmvrpnTXCbJbEk4x5hLkS4Qvly65dwteqRNidHSfSmJ72l/Csmhh2upgmm8yNYdfqIMLGoUWvpj8pzra+9flKg+F3o7hoDFNDGsefMHVBlTslbNlXce1rbkNKvfg92Bgptm3nghbM0qs7KmYDMRpLvFuBvpT/AIXCp/JwwUg9bv5WS9qGwMKr0fnVBpaW1v2xRyHVPZ9EEkEvAnbq8b0GrSjC06g224zLl5r036IHAz9W5ORrtFMdVkX5r29F1uAbabjYXrWfAhsaGQYzr4IpcvUZS6JIACJr5SQbXsN3KjOim04tpYX81483e3xEp9K6g5Rc/wCYov8AtLcHjey+CTYU2Ckx8EyEFTBY2ORh8dZkPEEEeG41bHEtw76Vb+o2P1DMIcN+47Z7YR6SRC8h6C7KTE4/DQS3Mbv2huuqqz5b8jlt516r006S7M2fiBhfzVBKQisT1cKAX3AXQk6W17688+C+AjauDOts7eH6KSvQ/hEw+wmxrHHSzriMkeYRiQrlt2fRQi9u+k8c2MQGvBiNO0q22FSQfCXswkB9jQqlxchYGyjiQvVi/heu+Gjo/h4ZMNLho44zKJAyrljRsnVlSF0UGzndv0oU4Tot9Pi/Zl/p1c//ANA2y4G274+3haGlQGCq0Nkdau0w4RK8lljZTlZSp5MCD76ZU+FxbqMoN0+YwDpvv6DAgeI1q4xW0UxKxpKpjMa5EaJQy200MbENwGofyoz6tRhAyyNpB+kX5lMi4uqAVxWrpdhO36PLKN/xZJa3fGwDjxy276GxuzXjNnUqeRBB99C/EMccvcuDSRIVURTDU7xUzXkD4j8NaODvCoQoTSCrJ9mSEZxGWHONhKB4hbkedV7Lrb7dD6qr0jXfCQepS5jm6hWK4YfLkQdwPWN/BcA+JFI+T5OY97WHuBNvWahjjo2HAO2iozE7goJPqFK/iAzd2wfG3cpbTLkFUZrU7U6LLAqNNiEQtvTLnk8kU/8AcVqqbGRR/oYcx+kntIfKIfFjzzVSjjm1G/ly7uHM25SeCu6iR8SEwuz5JAWVewN7sQkY8ZGso8L3pzxwp6TmVuUfZTzkcXPktuTVHjMVLKc0js5G65uFH1RuUdwtQ2WmmvqakxwHmfoGoRARLY5hogEY5R3BI73JLnzNqGAFcFvYAa67r3PdbusfWaIxUylVULYjedOVWDsum3X771wCXBCLMOtz5Nb5MubcbWzaDW1To8csqQXWCFnUM4RpGA+cx9Jz3CwvwFVtROCdKkNk5ierhxhQ7SF7Rg8J0ZjRVaOR2UAF3TF52PEtlsAfAAUdgcf0dgkWeKButTVD1eJY5uGXrOyDyJtXkmFixpGhGUAXL9SSo3Atmu338BRkInDrcr1Y9Jj1QZhyVU1Xu954CwoOcC0uMddksQE3pt0lkxuNaYoUAARIzvSNL2zcMxJJPDtV6d0S6X4CTZ0WFxqNZVEeUxu6yBD2HUqLg7uRuNK8i6QSL1gAtfKob1ta/fbL7qu452ECJDq5WLeByFxY8PxrafQY7Dspkn3TIgwQdwmes7tkQh5SXHvncvTXi6PrlJhIzC47OKvY6g2voLa+Y5inbZ6TYKDZ88GBjYlkdFUI6gGRSpkZpNTYa7ydB5eU43acqsSZCWJ1JCn7qOwW0S0TFyL9obgLjLfcPGiP9kEsD69RzhOheT4jwTVJtF5IBMePFM+Dna7YfaEcuJeTqlWTNe7742A7IuTqRW+2ti9g4iZ5pZMTncgtl/KlW4AXRQLDQCvNNkSgya/W+yodp4thIwDMBpoDbgKXxeBmrmY9wtvTLqd8weZ616JJH0fCkq+MYgEhQ2KBYgbgWsAT3kCqDo5tVYcZhnlBVAxc3zO6IWkyoSNWKiwJtc2vWPnxb7usk1+uaPx87/laAm4KIw/3Rlte/MzUJtN1IOD3OdIjWdVZuemHSSQRGs6/wtR8Im3oZ8YZIu0pWMAsGXcCDobHfWaj2qRuUb+Gb8aH2lhnkcFSo7IGt992PLvoZtnTAjtp6z+FM4fFCnTawAw0QiU8U+m0NbNl6x8I3SLD4gwdSxOQyXJRltfJb0h3Guh21AuyJsNdusZZCAEYjtMG9IC3OvNNtzStkZCvpSeo5amwWKmEQGcBrNrYEXzEjSiU8M00KbGsfDXSNL3J1nigVqzfwwoxoZB57eMoSaZ0Iymx0ZSDaxGoKngb2INewdEvhNifDAY3Mky9kssbOsumjjICATx4X3d3kMmCxGZQxVonJKlQAM/FF+YTvt36VPhsRckACyMBwtx0A4AWqPaZp41oYWOlpNwBrum+v3CzKQ2yn9AtrLFtDDyykhEZi1gW06txcAanfR/woY2HE458RC91KxqAVZT2V39obr6eVZnDYNoZ0zEG6udP2GFSbRwjyPmUqNANSQdL91Zdap01TpXAzp/Mjim2jKVWTXsa9K+GLpJh8WuEEDMxj63PdHS2YRW9IC/ondWB/Ncnzk9Z/lorbbg5L6jM3dyoL6YqVAb9qk7Cq0S99SJMedQmG57FzfhbteGm/wAqlweFeQlY0ZmALEKLtYWubDU2vw+6oq0zT+OyuHKxwm0GUghiCDffxHGjdo7XnxL3dy7EWuSBoo77DcPOqFaKwExR1eynKytZiB6JzfdvrPqUmk5ovsRw90RKK2hsnERIJJImVTxNtL7r8vOqhnre9IemMEuGaNFbO4sQwsF3XN+J8K8/eqYWtVc38wQVSoADYqaAuTdM2YAm6XuAN5uNQO+jl2zIRaTJMOHWorn2vS99AYPEPGweN2RhuZWKkeYq5Xbgk/4mCKc/PymKU+MkVrjxB8aiuSTdgcO/skRH6gppvLfhMeCrIZqv4Ok86QHDo+VCcxygAk2t6Q1tpurNRipgpodWkx9iua8hLLMTUDPUzRnU8BvPAeNWmG6PkKsuJcYeJtVLgtLIP+TAO0w+scq6+lRWvawKjnE6qlQncL66WHHu7+GlHPs/q/8AiGMZ+iGs3+5d0Q/bsfqmiptrLHdcHGYhaxlYhsSw49saQg8owDzY1T5DV2l776Dv8h3nq20uppsQfRVerU8Bcsw3jM51b3LyAoe1PWM1Y7P2W8rBUUsTwAuaLnbTCu1hdYKoy1Z7M2fa08pyRXOU2u8jDeIVPpW4seyvG50N5idmJhgDiRnlA7EBJyoLkgz2OguSerU3N9SoOua2rjZJXLu1zoNwACjcqqNFUcANBUU6hq3aYG/f/wDP+2g/tzFVcCETtHbbsbIAiAkhFAsCeLEjtN3+QAGlAnac/Pwsq/hQhBpwYityi4GBoOoc95PXqdUsRGidAdbkMWPPf4+Nb/YuGCQ5zy0POwtp3cB5niAMJhF1HOt/iLJhhY7xYX933+sVqMow1vE207+KQxdUhoYNpvxWP2m5Zye/T8aZE7KDcW328xapZhZvs/GhJJ7k91amKa1zAHG3kE1hjCdBKVI56/376ZiXJN+dvcKivxp8jaVhPAuVoN0TEU7zVljJwzqym+QAeoEffVQ70ThmoLHiCzersP8AaipGctfMwFhuYjXyoWaSW/pvb9pqm63WosTiTbSiGnTDF1RrYRZnJA8TbzoiB+zbx99UseNI0NFw4sG1q18DWpPYGNdcb9UlWfIWowjJKn5M2isMoN7dv5JB4Nf17uNZ/Eu8bMsnpqbMeD2uA1uB51bbMOpuLgru7u48CDrfmKC6ToQwcm5IFzz00PmKDiKDc7iDFufWNvq9ys+k/LVyqrikNw17jXyuLUzEYpidGYDuJFC3tu/9fVakJrJxFTMZ27bzPVw9cFptFlI07/Pb2jT8XiC1u6/vobPUm/fSJbnmCpSpJRYmLEMWuwtZtz6bu0NSRzOtAMtuNIDU9K4e7UGbr9fRTA2LURYyObTFC7H/AD0AEv8A1FNlm4anK31juoba+ASJsqTJKLAhkzWNxexDAEHmKpUkqRpaz3UhmllhuR2uAFwnSc7jwGlrW13W1+41CwprNTCavkQiVOpFjcHNpYgiw33uLa8LaikDVBmpM1CLQolW8Eda7o50PlxMbyqyIkers5Og1JICgk6A6V1dWXiHlosrEwFBiMdDhtMKmaT9YmVWYHnDDqkeuoZszeFZvF4p3LSO7OzG7MxLMT3k6mlrqLQaNSp0QxNJnpa6tA2EKJUkctXGxdvy4ds8bWYcbdxH311dS9RjXCCiseRog9rbUeVizMSSST4mql3POurqPhWNkBUqPJuUO8ppVpK6tzBiXE7ko8o3AL2geVaeWQuo5AXtXV1eiY0NpghZmI+JZ3EXF24n3Cg3W4Hvrq6hYkTY6R9U7QUoa2lPyki9dXVm1HHRaTVF1Y40qW4UldQTAIACuNUzPc02Rb11dQqfvC6FqJKgdLU7D3uPH7KWuouGaBXtu8kpU0Wz6PQ526s+I+8f3yoPpMhFwe63h/Z+2lrq23n89zdkLNB/Nb1HuKzLCmIeFdXV5/EtArQN471sM0XBgCbi+hG8ixI0OnKoga6urMfYrp2J164GlrqlckvXZqWuqh1UykLU3NXV1VkhQlriK6uqYELl/9k=")`,
                }}
              ></div>
              <div className="best-post-content">
                <div className="best-post-content-cat">November 19, 2022<span className="dot"> </span>Blog</div>
                <div className="best-post-content-title"> 
                  A Decentralised Social Media Solana BlockChain 
                </div>
                <div className="best-post-content-sub">
                  This is a decentralised Blog Application where users can post their views and opinions on various topics and also a mechanism to buy and sell NFTs easily, using this decetralised platform.
                </div>
              </div>
            </article>

            <div className="all__posts">
              {posts.map((item) => {
                return (
                  <article className="post__card-2"
                    onClick={() => {
                      history.push(`/read-post/${item.publicKey.toString()}`)
                    }}
                    key={item.account.id}
                  >
                    <div className="post__card_-2">
                      <div
                        className="post__card__image-2"
                        style={{
                          backgroundImage: `url("https://solana.ghost.io/content/images/downloaded_images/Why-Solana-/1-waEQvGbvr356cP3IcZRHzg.png")`,
                        }}
                      ></div>
                      <div>
                        <div className="post__card_meta-2">
                          <div className="post__card_cat">November 19, 2022 <span className="dot"> </span>{item.account.title} </div>
                          <p className="post__card_alttitle-2">
                            {item.account.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
        <div className={`modal ${showModal && 'show-modal'}`} >
          <div className="modal-content">
            <span className="close-button"
              onClick={() => setShowModal(false)}
            >×</span>
            <PostForm
              postTitle={postTitle}
              postContent={postContent}
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              onSubmit={() => createPost(postTitle, postContent)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

