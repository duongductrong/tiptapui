/**
 * Composes two event handlers into one.
 *
 * @param originalHandler - The original event handler.
 * @param customHandler - The custom event handler to be executed before the original handler.
 * @returns A new event handler that executes the custom handler first, followed by the original handler.
 */
export function composeEventHandler<E>(
  originalHandler?: (event: E) => void,
  customHandler?: (event: E) => void
) {
  return (evt: E) => {
    customHandler?.(evt)
    return originalHandler
  }
}
