import Head from "next/head"
import useStore from "@/lib/store"

type Props = {
  children: React.ReactNode
}

const Container: React.FC<Props> = (props: Props) => {

  const displayName = useStore(state => state.user.displayName)

  return (
    <div>
      <Head>
        <title>Notez by Stone Sha</title>
        <meta name="description" content="Notez - A note taking app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {displayName && <h1 className="text-center">Notes for <strong>{displayName}</strong></h1>}
        <br/>
        {props.children}
      </main>

      <footer>
      </footer>
    </div>
  )
};

export default Container;
