/**
 * Adds a player to a depth chart for a given position (at a specific spot).
 *
 * If no positionDepth is provided then add them to end of the depth chart for
 * that position. If you are entering two players into the same slot, the last
 * player entered gets priority and bumps the existing player down a depth spot.
 *
 * @param player {object}
 *    The player object.
 *
 * @parm position {string}
 *    The position.
 *
 * @param [positionDepth=0] {integer}
 *   The position on the depth chart. 0 is the end.
 */
export const addPlayerToDepthChart = (player, position, positionDepth) => {
  if (player.player_id !== undefined) {
    if (!global.depthChart.hasOwnProperty(position)) {
      global.depthChart[position] = []
    }
    global.depthChart[position].splice(positionDepth, 0, player.player_id)
  }
}

/**
 * Removes a player from the depth chart for a position.
 *
 * @param player {object}
 *    The player object.
 *
 * @parm position {string}
 *    The position.
 */
export const removePlayerFromDepthChart = (player, position) => {
  if (global.depthChart.hasOwnProperty(position) && player.player_id !== undefined) {
    const indexOfPlayer = global.depthChart[position].findIndex(element => element === player.player_id)
    if (indexOfPlayer >= 0) {
      global.depthChart[position].splice(indexOfPlayer, 1)
    }
  }
}

/**
 * Prints out all depth chart positions.
 *
 * @return {object}
 *   The depth chart.
 */
export const getFullDepthChart = () => {
  return global.depthChart
}

/**
 * For a given player find all players below them on the depth chart.
 *
 * @param player {object}
 *    The player object.
 *
 * @parm position {string}
 *    The position.
 *
 * @return {array}
 *    An array of player ids that are below the supplied player on the provided
 *    position.
 */
export const getPlayersUnderPlayerInDepthChart = (player, position) => {
  if (global.depthChart.hasOwnProperty(position) && player.player_id !== undefined) {
    const indexOfPlayer = global.depthChart[position].findIndex(element => element === player.player_id)
    if (indexOfPlayer >= 0) {
      return global.depthChart[position].splice(indexOfPlayer + 1)
    }
  }
  return []
}
