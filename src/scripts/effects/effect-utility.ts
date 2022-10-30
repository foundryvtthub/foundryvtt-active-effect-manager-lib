export function debugM(moduleName: string, msg: any, args = ""): string {
	if (game.settings.get(moduleName, "debug")) {
		console.log(`DEBUG | ${moduleName} | ${msg}`, args);
	}
	return msg;
}

export function logM(moduleName: string, message: any): string {
	message = `${moduleName} | ${message}`;
	console.log(message.replace("<br>", "\n"));
	return message;
}

export function notifyM(moduleName: string, message: any): string {
	message = `${moduleName} | ${message}`;
	ui.notifications?.notify(message);
	console.log(message.replace("<br>", "\n"));
	return message;
}

export function infoM(moduleName: string, info: string, notify = false): string {
	info = `${moduleName} | ${info}`;
	if (notify) ui.notifications?.info(info);
	console.log(info.replace("<br>", "\n"));
	return info;
}

export function warnM(moduleName: string, warning: string, notify = false): string {
	warning = `${moduleName} | ${warning}`;
	if (notify) ui.notifications?.warn(warning);
	console.warn(warning.replace("<br>", "\n"));
	return warning;
}

export function errorM(moduleName: string, error: string, notify = true): Error {
	error = `${moduleName} | ${error}`;
	if (notify) ui.notifications?.error(error);
	return new Error(error.replace("<br>", "\n"));
}

export function timelog(moduleName: string, message: any): void {
	warnM(moduleName, String(Date.now()), message);
}

export const i18n = (key: string): string => {
	return game.i18n.localize(key)?.trim();
};

export const i18nFormat = (key: string, data = {}): string => {
	return game.i18n.format(key, data)?.trim();
};

// export const setDebugLevel = (debugText: string): void => {
//   debugEnabled = { none: 0, warn: 1, debug: 2, all: 3 }[debugText] || 0;
//   // 0 = none, warnings = 1, debug = 2, all = 3
//   if (debugEnabled >= 3) CONFIG.debug.hooks = true;
// };

export function dialogWarningM(moduleName, message, icon = "fas fa-exclamation-triangle") {
	return `<p class="${moduleName}-dialog">
          <i style="font-size:3rem;" class="${icon}"></i><br><br>
          <strong style="font-size:1.2rem;">${moduleName}</strong>
          <br><br>${message}
      </p>`;
}

export function cleanUpString(stringToCleanUp: string): string {
	// regex expression to match all non-alphanumeric characters in string
	const regex = /[^A-Za-z0-9]/g;
	if (stringToCleanUp) {
		return i18n(stringToCleanUp).replace(regex, "").toLowerCase();
	} else {
		return stringToCleanUp;
	}
}

export function isStringEquals(stringToCheck1: string, stringToCheck2: string, startsWith = false): boolean {
	if (stringToCheck1 && stringToCheck2) {
		const s1 = cleanUpString(stringToCheck1) ?? "";
		const s2 = cleanUpString(stringToCheck2) ?? "";
		if (startsWith) {
			return s1.startsWith(s2) || s2.startsWith(s1);
		} else {
			return s1 === s2;
		}
	} else {
		return stringToCheck1 === stringToCheck2;
	}
}

export function is_real_number(inNumber): boolean {
	return !isNaN(inNumber) && typeof inNumber === "number" && isFinite(inNumber);
}

export function isGMConnected(): boolean {
	return !!Array.from(<Users>game.users).find((user) => user.isGM && user.active);
}

export function isEmptyObject(obj: any): boolean {
	// because Object.keys(new Date()).length === 0;
	// we have to do some additional check
	if (obj === null || obj === undefined) {
		return true;
	}
	const result =
		obj && // null and undefined check
		Object.keys(obj).length === 0; // || Object.getPrototypeOf(obj) === Object.prototype);
	return result;
}
