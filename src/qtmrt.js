'use strict';

var qtmrt = {
	UINT64_SIZE:              8,
	UINT32_SIZE:              4,
	UINT16_SIZE:              2,
	UINT8_SIZE:               1,
	FLOAT_SIZE:               4,

	ERROR:                    0,
	COMMAND:                  1,
	XML:                      2,
	DATA:                     3,
	NO_MORE_DATA:             4,
	C3D_FILE:                 5,
	EVENT:                    6,
	DISCOVER:                 7,
	QTM_FILE:                 8,
	COMMAND_RESPONSE:         999,

	CONNECTED:                1,
	CONNECTION_CLOSED:        2,
	CAPTURE_STARTED:          3,
	CAPTURE_STOPPED:          4,
	FETCHING_FINISHED:        5,
	CALIBRATION_STARTED:      6,
	CALIBRATION_STOPPED:      7,
	RT_FROM_FILE_STARTED:     8,
	RT_FROM_FILE_STOPPED:     9,
	WAITING_FOR_TRIGGER:      10,
	CAMERA_SETTINGS_CHANGED:  11,
	QTM_SHUTTING_DOWN:        12,
	CAPTURE_SAVED:            13,

	COMPONENT_3D:                      1,
	COMPONENT_3D_NO_LABELS:            2,
	COMPONENT_ANALOG:                  3,
	COMPONENT_FORCE:                   4,
	COMPONENT_6D:                      5,
	COMPONENT_6D_Euler:                6,
	COMPONENT_2D:                      7,
	COMPONENT_2D_LINEARIZED:           8,
	COMPONENT_3D_RESIDUALS:            9,
	COMPONENT_3D_NO_LABELS_RESIDUALS:  10,
	COMPONENT_6D_RESIDUALS:            11,
	COMPONENT_6D_EULER_RESIDUALS:      12,
	COMPONENT_ANALOG_SINGLE:           13,
	COMPONENT_IMAGE:                   14,
	COMPONENT_FORCE_SINGLE:            15,

	LITTLE_ENDIAN:            0,
	BIG_ENDIAN:               1,

};

qtmrt.HEADER_SIZE                = 2 * qtmrt.UINT32_SIZE;
qtmrt.COMPONENT_HEADER_SIZE      = 2 * qtmrt.UINT32_SIZE;
qtmrt.COMPONENT_MARKER_2D_SIZE   = 2 * (qtmrt.UINT32_SIZE + qtmrt.UINT16_SIZE);
qtmrt.COMPONENT_MARKER_3D_OFFSET = qtmrt.COMPONENT_HEADER_SIZE + qtmrt.UINT32_SIZE + 2 * qtmrt.UINT16_SIZE;
qtmrt.COMPONENT_MARKER_2D_OFFSET = qtmrt.COMPONENT_MARKER_3D_OFFSET;
qtmrt.DATA_FRAME_HEADER_SIZE     = qtmrt.HEADER_SIZE + qtmrt.UINT64_SIZE + 2 * qtmrt.UINT32_SIZE;
qtmrt.byteOrder                  = qtmrt.LITTLE_ENDIAN;
 
qtmrt.packetTypeToString = function(typeId)
{
	var typeNames = {};

	typeNames[qtmrt.ERROR]            = 'Error';
	typeNames[qtmrt.COMMAND]          = 'Command';
	typeNames[qtmrt.XML]              = 'XML';
	typeNames[qtmrt.DATA]             = 'Data';
	typeNames[qtmrt.NO_MORE_DATA]     = 'No More Data';
	typeNames[qtmrt.C3D_FILE]         = 'C3D file';
	typeNames[qtmrt.EVENT]            = 'Event';
	typeNames[qtmrt.DISCOVER]         = 'Discover';
	typeNames[qtmrt.QTM_FILE]         = 'QTM file';
	typeNames[qtmrt.COMMAND_RESPONSE] = 'Command Response';

	return typeNames[typeId];
};

qtmrt.eventToString = function(eventId)
{
	var eventNames = {};

	eventNames[qtmrt.CONNECTED]               = 'Connected';
	eventNames[qtmrt.CONNECTION_CLOSED]       = 'Connection Closed';
	eventNames[qtmrt.CAPTURE_STARTED]         = 'Capture Started';
	eventNames[qtmrt.CAPTURE_STOPPED]         = 'Capture Stopped';
	eventNames[qtmrt.FETCHING_FINISHED]       = 'Fetching Finished';
	eventNames[qtmrt.CALIBRATION_STARTED]     = 'Calibration Started';
	eventNames[qtmrt.CALIBRATION_STOPPED]     = 'Calibration Stopped';
	eventNames[qtmrt.RT_FROM_FILE_STARTED]    = 'RT From File Started';
	eventNames[qtmrt.RT_FROM_FILE_STOPPED]    = 'RT From File Stopped';
	eventNames[qtmrt.WAITING_FOR_TRIGGER]     = 'Waiting For Trigger';
	eventNames[qtmrt.CAMERA_SETTINGS_CHANGED] = 'Camera Settings Changed';
	eventNames[qtmrt.QTM_SHUTTING_DOWN]       = 'QTM Shutting Down';
	eventNames[qtmrt.CAPTURE_SAVED]           = 'Capture Saved';

	return eventNames[eventId];
};

module.exports = qtmrt;

