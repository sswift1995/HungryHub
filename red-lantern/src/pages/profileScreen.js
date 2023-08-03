


export default function profileScreen(){
    return(
        <div>
            <h1>
                Profile
            </h1>
            <input value="name"
            onChange={setName}
            placholder="Name">
            </input>
        </div>
    )
}