export default function mduibus() {
	const allHandlers = new Map();

	return {
		on(type: any, handler: any) {
			let handlers = allHandlers.get(type);
            if (!handlers)
                handlers = [handler];
            else
                handlers.push(handler);

            allHandlers.set(type, handlers);
		},

		off(type: any, handler: any) {
			let handlers = allHandlers.get(type);
			if (handlers) {
				handlers.splice(handlers.indexOf(handler) >>> 0, 1);
			}
		},

		emit(type: any, evt: any) {
            let handlers = allHandlers.get(type);
            if (handlers) {
                handlers.slice().map((handler: any) => { handler(evt);});
            }
		}
	};
}