export const clickOutside = {
   bind(el: any, binding: any, vNode: any) {
      if (typeof binding.value !== 'function') { const compName = vNode.context.name; }
      const bubble = binding.modifiers.bubble;
      const handler = (e: any) => {
         if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
         }
      };
      el.__vueClickOutside__ = handler;
      document.addEventListener('click', handler);
   },
   unbind(el: any) {
      document.removeEventListener('click', el.__vueClickOutside__);
      el.__vueClickOutside__ = null;
   },
};

