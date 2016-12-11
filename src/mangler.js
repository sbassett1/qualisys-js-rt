'use strict';

(function() {
	var qtmrt      = require('./qtmrt')
	  , readUInt32 = require('./buffer-io').readUInt32
	;

	class Mangler {
		constructor() {
			this.chunks            = new Buffer(0);
			this.currentPacketSize = null;
		}

		read(chunk, callback) {
			var bytesRead = 0;

			// New packet.
			if (this.chunks.length === 0)
				this.currentPacketSize = readUInt32(chunk, 0, null, qtmrt.byteOrder === qtmrt.LITTLE_ENDIAN);

			while (this.chunks.length < this.currentPacketSize && bytesRead < chunk.length) {
				var copySize = Math.min(this.currentPacketSize - this.chunks.length, chunk.length - bytesRead);
				this.chunks  = Buffer.concat([this.chunks, chunk.slice(bytesRead, bytesRead + copySize)]);
				bytesRead   += copySize;

				if (this.chunks.length === this.currentPacketSize) {
					callback.fun.call(callback.thisArg, this.chunks);

					if (bytesRead !== chunk.length)
						this.currentPacketSize = readUInt32(chunk.slice(bytesRead, bytesRead + qtmrt.UINT32_SIZE, null, qtmrt.byteOrder === qtmrt.LITTLE_ENDIAN), 0);

					this.chunks = new Buffer(0);
				}
			}
		}
	}

	module.exports = Mangler;
})();