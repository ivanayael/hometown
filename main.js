//Variables for setup


let container;
let camera;
let renderer;
let scene;
let house;


function init(){
  container = document.querySelector('.scene');
  scene = new THREE.Scene();
  const fov = 35;
  const aspect = container.clientWidth /container.clientHeight;

  const near = 0.01;
  const far = 1000;

  //camara setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0,3,35);

  // ambient light

  const ambient = new THREE.AmbientLight(0x404040,2);
  scene.add(ambient);

  // directional light

  const light = new THREE.DirectionalLight(0Xffffff,2);
  light.position.set(10,10,100);
  scene.add(light);

  //renderer

  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load model
  let loader = new THREE.GLTFLoader();
  loader.load("public/scene.gltf", function(gltf){
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    renderer.render(scene, camera);
    animate();
  });

  
}

function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.05;
  renderer.render(scene, camera);
}

init();

function onWindowsResize(){
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowsResize);