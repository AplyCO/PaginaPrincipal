const screens=[...document.querySelectorAll('[data-screen]')];
const nav=[...document.querySelectorAll('[data-go]')];
function setActiveNavigation(name,projectType){document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));const direct=document.querySelector(`.nav [data-go="${name}"]`);if(direct)direct.classList.add('active');if(['nosotros','que-hacemos','clientes'].includes(name))document.querySelector('.nav-about>.nav-dropdown-trigger')?.classList.add('active');if(name==='acabados')document.querySelector('.nav-dropdown:not(.nav-about)>.nav-dropdown-trigger')?.classList.add('active');if(name==='proyectos'&&projectType)document.querySelector(`.nav [data-project-open="${projectType}"]`)?.classList.add('active')}
function go(name){screens.forEach(s=>s.classList.toggle('active',s.dataset.screen===name));setActiveNavigation(name);document.querySelector('.nav').classList.remove('open');history.replaceState(null,'','#'+name)}
nav.forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
document.querySelector('.menu').addEventListener('click',()=>document.querySelector('.nav').classList.toggle('open'));
const projectContent={comerciales:{title:'Proyectos comerciales',description:'Diseñamos y ejecutamos espacios corporativos, comerciales e institucionales que responden a las necesidades operativas, estéticas y de marca de cada cliente.'},residenciales:{title:'Proyectos residenciales',description:'Transformamos viviendas en espacios funcionales, confortables y personalizados, cuidando cada detalle desde el diseño hasta la entrega final.'}};
function openProjectType(type){go('proyectos');setActiveNavigation('proyectos',type);document.querySelectorAll('[data-project-tab]').forEach(x=>x.classList.toggle('active',x.dataset.projectTab===type));document.querySelectorAll('[data-project-list]').forEach(x=>x.classList.toggle('active',x.dataset.projectList===type));document.querySelector('#projects-title').textContent=projectContent[type].title;document.querySelector('#projects-description').textContent=projectContent[type].description}
document.querySelectorAll('[data-project-open]').forEach(b=>b.addEventListener('click',()=>openProjectType(b.dataset.projectOpen)));
document.querySelectorAll('[data-project-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-project-tab]').forEach(x=>x.classList.remove('active'));document.querySelectorAll('[data-project-list]').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelector(`[data-project-list="${b.dataset.projectTab}"]`).classList.add('active')}));
const finish={baños:['Baños','Escribe aquí la descripción de baños y sus opciones.',['Muebles de baño','Sanitarios','Tinas y jacuzzis']],pisos:['Pisos laminados, PVC y SPC','Escribe aquí la descripción, referencias y aplicaciones disponibles.',['Laminados','PVC','SPC']],ceramicas:['Cerámicas y porcelanatos','Escribe aquí la descripción de cerámicas y porcelanatos.',['Cerámicas','Porcelanatos']],carpinteria:['Carpintería','Escribe aquí la descripción de los trabajos de carpintería.',['Mobiliario','Puertas','Detalles a medida']],mobiliario:['Mobiliario','Escribe aquí la descripción de las opciones de mobiliario disponibles.',['Cocinas','Clósets','Muebles a medida']]};
function updateFinishGallery(title){document.querySelectorAll('.finish-gallery-photo').forEach((photo,index)=>{photo.querySelector('span').textContent=`${title} · Foto ${index+1}`})}
document.querySelectorAll('[data-finish]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-finish]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=finish[b.dataset.finish];document.querySelector('#finish-title').textContent=d[0];document.querySelector('#finish-description').textContent=d[1];document.querySelector('#finish-subcategories').innerHTML=d[2].map(x=>`<span>${x}</span>`).join('');updateFinishGallery(d[0])}));
document.querySelectorAll('[data-open-finish]').forEach(b=>b.addEventListener('click',()=>{go('acabados');const key=b.dataset.openFinish;const sub=b.dataset.finishSub;document.querySelectorAll('[data-finish]').forEach(x=>x.classList.toggle('active',x.dataset.finish===key));const d=finish[key];const title=sub||d[0];document.querySelector('#finish-title').textContent=title;document.querySelector('#finish-description').textContent=sub?`Escribe aquí la descripción, referencias y opciones de ${sub.toLowerCase()}.`:d[1];document.querySelector('#finish-subcategories').innerHTML=d[2].map(x=>`<span>${x}</span>`).join('');updateFinishGallery(title)}));
const modal=document.querySelector('#modal');
function openModal(title,desc){document.querySelector('#modal-title').textContent=title;document.querySelector('#modal-description').textContent=desc;document.querySelectorAll('[data-modal-photo]').forEach((photo,index)=>photo.dataset.photoTitle=`${title} · Foto ${index+1}`);modal.classList.add('open');modal.setAttribute('aria-hidden','false')}
document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.project,'Escribe aquí la descripción de este proyecto: alcance, solución, materiales y resultado.')));
document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.modal,b.dataset.desc)));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}));
const finishLightbox=document.querySelector('#finish-lightbox');
const finishGalleryPhotos=[...document.querySelectorAll('.finish-gallery-photo')];
const modalGalleryPhotos=[...document.querySelectorAll('[data-modal-photo]')];
let activeLightboxPhotos=[];
let finishLightboxIndex=0;
function photoTitle(photo,index){return photo.dataset.photoTitle||photo.querySelector('span')?.textContent||`Foto ${index+1}`}
function showFinishLightbox(index,photos=activeLightboxPhotos){activeLightboxPhotos=photos;finishLightboxIndex=(index+activeLightboxPhotos.length)%activeLightboxPhotos.length;document.querySelector('#lightbox-title').textContent=photoTitle(activeLightboxPhotos[finishLightboxIndex],finishLightboxIndex);document.querySelector('#lightbox-current').textContent=finishLightboxIndex+1;document.querySelector('.lightbox-photo span').lastChild.textContent=` / ${activeLightboxPhotos.length}`;document.querySelectorAll('.lightbox-arrow').forEach(arrow=>arrow.hidden=activeLightboxPhotos.length<2);finishLightbox.classList.add('open');finishLightbox.setAttribute('aria-hidden','false')}
function closeFinishLightbox(){finishLightbox.classList.remove('open');finishLightbox.setAttribute('aria-hidden','true')}
finishGalleryPhotos.forEach(photo=>photo.addEventListener('click',()=>showFinishLightbox(Number(photo.dataset.galleryIndex),finishGalleryPhotos)));
document.querySelectorAll('[data-expand-photo]').forEach(photo=>{const open=()=>showFinishLightbox(0,[photo]);photo.addEventListener('click',open);photo.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}})});
modalGalleryPhotos.forEach((photo,index)=>{const open=()=>showFinishLightbox(index,modalGalleryPhotos);photo.addEventListener('click',open);photo.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}})});
document.querySelector('[data-lightbox-previous]').addEventListener('click',()=>showFinishLightbox(finishLightboxIndex-1));
document.querySelector('[data-lightbox-next]').addEventListener('click',()=>showFinishLightbox(finishLightboxIndex+1));
document.querySelectorAll('[data-lightbox-close]').forEach(button=>button.addEventListener('click',closeFinishLightbox));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){modal.classList.remove('open');closeFinishLightbox()}if(finishLightbox.classList.contains('open')&&e.key==='ArrowLeft')showFinishLightbox(finishLightboxIndex-1);if(finishLightbox.classList.contains('open')&&e.key==='ArrowRight')showFinishLightbox(finishLightboxIndex+1)});
const carouselSlides=[...document.querySelectorAll('.hero-slide')];
const carouselCurrent=document.querySelector('#carousel-current');
const carouselPause=document.querySelector('.carousel-pause');
let carouselIndex=0;
let carouselPaused=false;
let carouselTimer;
function showCarouselSlide(index){carouselIndex=(index+carouselSlides.length)%carouselSlides.length;carouselSlides.forEach((slide,i)=>slide.classList.toggle('active',i===carouselIndex));carouselCurrent.textContent=carouselIndex+1}
function startCarousel(){clearInterval(carouselTimer);carouselTimer=setInterval(()=>{if(!carouselPaused)showCarouselSlide(carouselIndex+1)},3500)}
document.querySelector('.carousel-arrow.next').addEventListener('click',()=>{showCarouselSlide(carouselIndex+1);startCarousel()});
document.querySelector('.carousel-arrow.previous').addEventListener('click',()=>{showCarouselSlide(carouselIndex-1);startCarousel()});
carouselPause.addEventListener('click',()=>{carouselPaused=!carouselPaused;carouselPause.textContent=carouselPaused?'▶':'Ⅱ';carouselPause.setAttribute('aria-label',carouselPaused?'Reproducir carrusel':'Pausar carrusel')});
startCarousel();
go(location.hash.slice(1)||'inicio');
