const limit_nbr = require('./limit_nbr');

const getAiMove = (nft, user_nft, health, user_health, user_moves, moves) => {
	let open_moves = ["DEFEND", "GRAB", "ATTACK", "HEAL"];

	if (health >= nft.stats.heal * 0.9 && (health - user_moves.user_attack) > 1)
		open_moves = ["ATTACK"];

	if (health <= 1 && user_health - (nft.stats.attack / 2) > 0) {
		open_moves = ["DEFEND", "HEAL"]
	}
	else if (user_health - (nft.stats.attack / 2) <= 0)
		return "GRAB";

	else if (user_health - nft.stats.attack <= 0)
		return "ATTACK";

	else if(user_health >= user_moves.user_heal * 0.75)
		return Math.random() < 0.7 ? "GRAB" : "ATTACK";

	else if (health >= nft.stats.heal * 0.5 && (health - user_moves.user_attack) > 1)
		open_moves = ["ATTACK", "GRAB"];



	const rand = open_moves.length > 2 ? Math.floor(Math.random() * (open_moves.length - 1)) : Math.random() < 0.5 ? 0 : 1;

	return open_moves[rand];
};

const getHealth = (battle) => {
	let user_health = battle.contestant1.health;
	let opponent_health = battle.contestant2.health;

	if (battle.history[0]) {
		const length = battle.history.length;
		user_health = battle.history[length - 1].contestant1Health;
		opponent_health = battle.history[length - 1].contestant2Health;
	}
	return {user_health, opponent_health}
}

const getNewHistory = (history, user_health, opponent_health, move, response_move) => {
	let newHistory = history;
	newHistory.push({contestant1Move: move,
		contestant2Move: response_move,
		contestant1Health: user_health,
		contestant2Health: opponent_health})
	return newHistory;
}


module.exports = function runBattle (user, opponent, battle, move) {
	let {user_health, opponent_health} = getHealth(battle);

	let user_heal = user.nft.stats.heal;
	let user_attack = user.nft.stats.attack;
	let user_grab = user_attack / 2;
	let user_defense = user.nft.stats.defense;

	let opponent_heal = opponent.nft.stats.heal;
	let opponent_attack = opponent.nft.stats.attack;
	let opponent_grab = opponent_attack / 2;
	let opponent_defense = opponent.nft.stats.defense;

	const user_moves = {user_heal, user_attack, user_grab, user_defense};
	const opponent_moves = {opponent_heal, opponent_attack, opponent_grab, opponent_defense};
	const response_move = getAiMove(opponent.nft, user.nft, opponent_health, user_health,
																	user_moves, opponent_moves);

	switch (move) {
		case "HEAL":
			if (response_move === "HEAL") {
				user_health = user_health + user_heal;
				opponent_health = opponent_health + opponent_heal;
			}
			else if(response_move === "ATTACK") {
				user_health = user_health - opponent_attack;
			}
			else if(response_move === "GRAB") {
				user_health = user_health - opponent_grab;
			}
			else if(response_move === "DEFEND") {
				user_health = user_health + user_heal;
			}
			break ;
		case "ATTACK":
			if (response_move === "HEAL") {
				opponent_health = opponent_health - user_attack;
			}
			else if (response_move === "ATTACK") {
				user_health = user_health - opponent_attack;
				opponent_health = opponent_health - user_attack;
			}
			else if(response_move === "GRAB") {
				user_health = user_health - opponent_grab;
				opponent_health = opponent_health - user_attack;
			}
			else if(response_move === "DEFEND") {
				user_health = user_health - opponent_defense;
			}
			break ;
		case "GRAB":
			if (response_move === "HEAL") {
				opponent_health = opponent_health - user_grab;
			}
			else if (response_move === "ATTACK") {
				user_health = user_health - opponent_attack;
				opponent_health = opponent_health - user_grab;
			}
			else if(response_move === "GRAB") {
				user_health = user_health - opponent_grab;
				opponent_health = opponent_health - user_grab;
			}
			else if(response_move === "DEFEND"){
				opponent_health = opponent_health - limit_nbr(user_grab + opponent_grab);
			}
			break ;
		case "DEFEND":
			if (response_move === "HEAL") {
				opponent_health = opponent_health + opponent_heal;
			}
			else if (response_move === "ATTACK") {
				opponent_health = opponent_health - user_defense;
			}
			else if (response_move === "GRAB") {
				user_health = user_health - limit_nbr(opponent_attack + opponent_grab);
			}
			break ;
	}

	console.log("user final health", user_health);
	console.log("opponent final health", opponent_health)
	return getNewHistory(battle.history,
											limit_nbr(user_health, 0, battle.contestant1.health),
											limit_nbr(opponent_health, 0, battle.contestant2.health),
											move, response_move);
}