function a () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(123)
    }, 4000 )
  })
}

function b () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(456)
    }, 2000 )
  })
}

async function xyz() {
  const [x, y] = await Promise.all([
    a(), b()
  ])
  console.log(x)
  console.log(y)
}

xyz()

