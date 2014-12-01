'use strict';

module.exports = [
  {method: 'get',    path: '/{param*}',                     config: require('../definitions/general/static')},
  {method: 'post',   path: '/register',                     config: require('../definitions/users/post_register')},
  {method: 'post',   path: '/login',                        config: require('../definitions/users/post_login')},
  {method: 'delete', path: '/logout',                       config: require('../definitions/users/delete_logout')},
  {method: 'get',    path: '/status',                       config: require('../definitions/users/get_status')},
  {method: 'put',    path: '/users/{userId}',               config: require('../definitions/users/put_user_socket')},
  {method: 'post',   path: '/rooms',                        config: require('../definitions/rooms/post_rooms')},
  {method: 'get',    path: '/rooms',                        config: require('../definitions/rooms/get_rooms')},
  {method: 'get',    path: '/rooms/{roomId}',               config: require('../definitions/rooms/get_rooms_show')},
  {method: 'post',   path: '/rooms/{name}',                 config: require('../definitions/rooms/post_rooms_join')},
  {method: 'get',    path: '/rooms/{roomId}/readyNewGame',  config: require('../definitions/rooms/get_rooms_readynewgame')},
  {method: 'get',    path: '/rooms/{roomId}/readyJoinGame', config: require('../definitions/rooms/get_rooms_readyjoingame')},
  {method: 'post',   path: '/games',                        config: require('../definitions/games/post_games')},
  {method: 'put',    path: '/games/join',                   config: require('../definitions/games/put_games_join')},
  {method: 'put',    path: '/games/start',                  config: require('../definitions/games/put_games_start')},
  {method: 'get',    path: '/games/{roomId}/isplaying',     config: require('../definitions/games/get_games_isplaying')}
];
