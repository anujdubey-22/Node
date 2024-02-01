async function a(){
    console.log('a')
    console.log('b')
    await new Promise((res,rej)=> {
        setTimeout(() => {
            console.log('c')
            res()
        }, 3000);
    })

    await new Promise((res,rej) => {
        setTimeout(() => {
            console.log('d')
            res()
        }, 0);
    })

    console.log('e')
}

a()