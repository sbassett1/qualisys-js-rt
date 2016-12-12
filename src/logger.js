'use strict';

(function() {
	var _         = require('lodash')
	  , moment    = require('moment')
	  , sprintf   = require('sprintf')
	  , qtmrt     = require('./qtmrt')
	  , Packet    = require('./packet')
	  , Component = require('./component')
	;

	class Logger {
		timestamp() {
			return '[' + moment().format('HH:mm:ss') + ']';
		}

		log(message, color, style) {
			if (arguments.length < 2)
				color = 'white';

			if (message && message[color]) {
				message = message[color];

				if (message) {
					if (!_.isUndefined(style) && message[style])
						message = message[style];

					console.log(this.timestamp() + ' ' + message);
				}
			}
		}

		logPacket(packet) {
			var typeColors = { };

			typeColors[qtmrt.ERROR]            = 'red';
			typeColors[qtmrt.COMMAND]          = 'cyan';
			typeColors[qtmrt.XML]              = 'green';
			typeColors[qtmrt.DATA]             = 'white';
			typeColors[qtmrt.NO_MORE_DATA]     = 'grey';
			typeColors[qtmrt.C3D_FILE]         = 'grey';
			typeColors[qtmrt.EVENT]            = 'yellow';
			typeColors[qtmrt.DISCOVER]         = 'grey';
			typeColors[qtmrt.QTM_FILE]         = 'cyan';
			typeColors[qtmrt.COMMAND_RESPONSE] = 'green';

			var typeColor = packet.isResponse ? typeColors[packet.type] : typeColors[qtmrt.COMMAND]
			  , value     = packet.data
			  , suffix    = ''
			;

			// XXX: Move value stuff to toString on packets.
			if (packet.type === qtmrt.EVENT) {
				value = packet.eventName;
			}
			else if (packet.type === qtmrt.XML) {
				value = packet.data.substr(0, 50).replace(/\r?\n|\r|\s+/g, '') + ' ...';
			}
			else if (packet.type === qtmrt.DISCOVER) {
				if (packet.size === 10)
					value = 'QTM Discovery broadcast'.white;
				else {
					value  = packet.serverInfo;
					suffix = (' (' + packet.srcAddress + ':' + packet.srcPort + ')').cyan;
				}
			}
			else if (packet.type === qtmrt.DATA) {
				var componentTypes = '[' + _.keys(packet.components).map(Component.typeToPrettyString).join(', ') + ']';

				value = 'Frame: '      + packet.frameNumber
					+ ', Components: ' + componentTypes
					+ ', Size: '       + packet.size;
			}
			else if (packet.type === qtmrt.C3D) {
				value = '<C3D file> (' + (packet.size - qtmrt.HEADER_SIZE) + ' bytes)';
			}
			else if (packet.type === qtmrt.QTM) {
				value = '<QTM file> (' + (packet.size - qtmrt.HEADER_SIZE) + ' bytes)';
			}

			this.log(
				(sprintf('%-20s', '<' + Packet.typeToString(packet.type) + '>')
				+ value)[typeColor] + suffix
			);
		}
	}

	module.exports = Logger;
})();