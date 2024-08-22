
export default function Home(props) {

    const { jwtToken } = props

    return (
        <div>{jwtToken}</div>
    )
}


