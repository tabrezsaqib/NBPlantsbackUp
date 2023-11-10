import { useEffect } from "react"
import { useRouter } from "next/router"
import Router from "next/router"
import { useDispatch } from "react-redux"
import PlantFamilyDetails from "../plantFamilyDetails"
const API_URL = process.env.API_URL

const PlantFamilyDetail = ({ plant_family_details }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return
        // dispatch(fetchPlantPost(router.query["id"]))
    }, [dispatch, router.isReady, router])
    if (router.isFallback) return <div>Loading...</div> 
    const data = plant_family_details
    return (
        <div>
            <PlantFamilyDetails plant_family_details={data} />
        </div>
    )
}

export default PlantFamilyDetail

export async function getStaticPaths() {
    return {
        paths: [{ params: { family: 'sth' } }],
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    // fetch single post detail
    const response = await fetch(`${API_URL}plants_db/`)
    const all_plants = await response.json();
    const plant_family_details =all_plants.filter((data)=>data.acf.plant_family.includes(params.family))
    return {
        props: {
            plant_family_details,
        },
    }
}