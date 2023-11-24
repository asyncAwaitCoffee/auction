import store from '@/store'

export default {
    mounted(element, binding) {        
        let options = {
            rootMargin: "0px",
            threshold: 0.5,
        }

        const callback = (entries) => {
            
            if (!entries[0].isIntersecting) {
                return
            }
            
            if (entries[0].intersectionRatio < 1 || store.state.auction.size < 10 ) {
                binding.value()
            }
        }

        let observer = new IntersectionObserver(callback, options);
        observer.observe(element)

    },
    name: 'intersection'
}