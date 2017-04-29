$(document).ready(function() {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			// TWORZENIE ELEMENT�W SK�ADOWYCH KOLUMNY
			var $column = $('<div class="row col-4">').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kart�');
			// PODPINANIE ODPOWIEDNICH ZDARZE�
			$columnDelete.click(function () {
				self.removeColumn();
			});
			$columnAddCard.click(function (event) {
				self.addCard(new Card(prompt("Wpisz nazw� karty")));
			});
	
			// KONSTRUOWANIE ELEMENTU KOLUMNY
			$column.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
				.append($columnCardList);
			// ZWRACANIE STWORZONEJ  KOLUMNY
			return $column;
		}
	}
  
	Column.prototype = {
				addCard: function (card) {
					this.$element.children('ul').append(card.$element);
				},
				removeColumn: function () {
					this.$element.remove();
				}
			};
	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard(); //
		function createCard() {
			// TWORZENIE KLOCK�W
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');
			// PRZYPI�CIE ZDARZENIA
			$cardDelete.click(function () {
				self.removeCard();
			});
			// SK�ADANIE I ZWRACANIE KARTY
			$card.append($cardDelete)
				.append($cardDescription);
			return $card;
		}
	}
	Card.prototype = {
		removeCard: function () {
			this.$element.remove();
		}
	}
	var board = {
		name: 'Tablica Kanban',
		addColumn: function (column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}
  	$('.create-column')
			.click(function () {
				var name = prompt('Wpisz nazw� kolumny');
				var column = new Column(name);
				board.addColumn(column);
			});
	// TWORZENIE KOLUMN
	var todoColumn = new Column('Do zrobienia');
	var doingColumn = new Column('W trakcie');
	var doneColumn = new Column('Sko�czone');
	// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);
	// TWORZENIE NOWYCH EGZEMPLARZY KART
	var card1 = new Card('Nowe zadanie');
	var card2 = new Card('Stworzyc tablice kanban');
	// DODAWANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});