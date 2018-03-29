	const PRICE = 9.95;

	new Vue ({
		el: '#app',
		data: {
		total: 0,
		items: [],
		cart: [],
		newSearch: 'anime',
		lastSearch: '',
		loading: true,
		price: PRICE
	},
	methods: {
	onSubmit: function() {
		this.items = [];
		this.loading =  false
		this.$http
			.get('/search/'.concat(this.newSearch))
			.then(function(result) {
			this.items = result.data
			this.lastSearch = this.newSearch
			console.log(result.data)
			this.loading = true;
	})
	},

	addItem: function(index) {
		this.total += PRICE; 
		var item = this.items[index];
		let found = false;
		for (let i = 0; i < this.cart.length; i++){
			if (this.cart[i].id === item.id){
				found = true;
				this.cart[i].qty++;
				break;
			}
		} 
		if (!found){
			this.cart.push({
				id: item.id,
				title: item.title,
				qty: 1,
				price: PRICE,
			})
	}
	},

	increment: function(itemInc){
	itemInc.qty++;
	this.total += PRICE;
	},

	decrement: function(itemDec){
	itemDec.qty--;
	this.total -= PRICE
	if(itemDec.qty <= 0){
			for (let i = 0; this.cart.length; i++){
					if(this.cart[i].id === itemDec.id){
							this.cart.splice(i, 1);
	break;
					}
			}
	}
	}
	},
	filters: {
	currency: (price) => {
	return '€'.concat(price.toFixed(2))
	}
	},
	mounted: function() {
	this.onSubmit()	
	}
	})