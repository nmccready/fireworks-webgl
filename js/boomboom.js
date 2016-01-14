var BoomBoom = {
	_ctx: null,
	_data: null,
	_last: {
		ts: 0,
		value: 0
	},
	_decay: 300,

	handleEvent: function(e) {
		switch (e.type) {
			case "load":
				this._init();
			break;

			case "ended":
 			break;

			case "submit":
				e.preventDefault();
			break;

			case "change":

			break;

			case "click":
				Render.scene.push(new Explosion(Render.gl, 1));
			break;
		}
	},

	_init: function() {
		this._build();
		// this._next();

		this._tick = this._tick.bind(this);
		setInterval(this._tick, 15);
	},

	_build: function() {
		document.querySelector("body").addEventListener("click", this);
	},

	_tick: function() {
		/* current values */
		var now = Date.now();
		var value = Math.random() * 20;

		/* diffs */
		var delta = value-this._last.value;
		var timeDiff = now - this._last.ts;

		/* always maintain last */
		this._last.value = value;

		if (timeDiff < this._decay) { /* decay */
			this._last.value = value;
			return;
		}


		if (delta > 15) {
			this._last.ts = now;
			var force = delta / 50;
			Render.scene.push(new Explosion(Render.gl, force));

			/* one more! */
			if (force > 1.1) { Render.scene.push(new Explosion(Render.gl, 1)); }
		}
	}
}
window.addEventListener("load", BoomBoom);
