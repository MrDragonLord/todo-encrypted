import { AES, enc } from 'crypto-js'

/**
 * Шифрует переданные данные с использованием алгоритма AES.
 *
 * @param {unknown} data - Любые сериализуемые данные (например, объект, массив).
 * @param {string} password - Пароль, используемая для симметричного шифрования.
 * @returns {string} Зашифрованная строка.
 *
 * @example
 * const encrypted = encryptAES({ name: 'admin' }, 'secret')
 */
export function encryptAES(data: unknown, password: string): string {
	const jsonString = JSON.stringify(data)
	return AES.encrypt(jsonString, password).toString()
}

/**
 * Расшифровывает AES-строку в оригинальные данные.
 *
 * @template T Тип возвращаемых данных после JSON.parse.
 * @param {string} encrypted - Зашифрованная строка, полученная из encryptAES.
 * @param {string} password - Пароль, используемый при шифровании.
 * @returns {T} Расшифрованные данные оригинального типа.
 * @throws {Error} Если ключ неверный или файл повреждён.
 *
 * @example
 * const decrypted = decryptAES<{ name: string }>(encrypted, 'secret')
 */
export function decryptAES<T>(encrypted: string, password: string): T {
	const bytes = AES.decrypt(encrypted, password)
	const decrypted = bytes.toString(enc.Utf8)
	if (!decrypted) throw new Error('Неверный ключ или повреждённый файл')
	return JSON.parse(decrypted) as T
}
