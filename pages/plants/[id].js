import { useEffect } from "react"
import { useRouter } from "next/router"
import Router from "next/router"
import { useDispatch } from "react-redux"
import PlantSpeciesDetails from "../../components/main/PlantSpeciesDetails"
import Head from "next/head"
const API_URL = process.env.API_URL

const PlantsDetails = ({ plant_details }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) return
    // dispatch(fetchPlantPost(router.query["id"]))
  }, [dispatch, router.isReady, router])
  const data = plant_details[0]
  return (
    <div>
      <Head>
        <title>{plant_details[0].title} | NB Plants</title>
      </Head>
      <PlantSpeciesDetails plant_details={data} />
    </div>
  )
}

export default PlantsDetails

export async function getStaticPaths() {
  const response = await fetch(`${API_URL}plants_db`)
  const postList = await response.json()

  return {
    paths: postList.map((post) => {
      return {
        params: {
          id: `${post.slug}`,
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // fetch single post detail
  const response = await fetch(`${API_URL}plants_db/${params.id}`)
  const plant_details = await response.json()
  return {
    props: {
      plant_details,
    },
  }
}