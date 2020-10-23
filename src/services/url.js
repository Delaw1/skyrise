// export const BASEURL = "https://skyriseprojects.com/api"
export const BASEURL = "http://localhost:8000"

export const routes = {
    BASEURL,

    // AUTH
    CREATEPROJECT: `${BASEURL}/createProject`,
    CREATEDEVELOPER: `${BASEURL}/createDeveloper`,
    GETPROJECT: `${BASEURL}/getProject`,
    DELPROJECT(id) { return `${BASEURL}/deleteProject/${id}`} ,
    GETATTACHED: `${BASEURL}/getAttached`,
    GETDETTACHED: `${BASEURL}/getDetached`,
    GETDEVELOPERS: `${BASEURL}/getDevelopers`,
    GETDEVELOPER: `${BASEURL}/getDeveloper/`,
    GETGS: `${BASEURL}/getGS`,
    SAVEGS: `${BASEURL}/saveGS`,
    UPLOAD: `${BASEURL}/uploadMedia`,
    UPLOADVIDEO: `${BASEURL}/test`

}