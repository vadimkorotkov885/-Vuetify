new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: () => ({
		displayValue: '',
		previousValue: null,
		operation: null,
		waitingForOperand: false,
		expression: '',
		lastOperation: null,
	}),
	methods: {
		append(number) {
			if (['+', '-', '*', '/'].includes(number)) {
				if (this.displayValue === '' && number === '-') {
					this.displayValue = '-'
					return
				}

				if (this.displayValue === '' || this.displayValue === '-') return

				if (this.operation && !this.waitingForOperand) {
					this.calculate()
				}

				this.expression = this.displayValue + ' ' + number
				this.previousValue = parseFloat(this.displayValue)
				this.operation = number
				this.waitingForOperand = true
				this.lastOperation = number
			} else {
				if (this.waitingForOperand) {
					this.displayValue = String(number)
					this.waitingForOperand = false
					this.expression += ' ' + this.displayValue
				} else {
					this.displayValue =
						this.displayValue === '0'
							? String(number)
							: this.displayValue + number
					if (this.operation) {
						this.expression =
							this.previousValue +
							' ' +
							this.operation +
							' ' +
							this.displayValue
					}
				}
			}
		},
		clear() {
			this.displayValue = ''
			this.previousValue = null
			this.operation = null
			this.waitingForOperand = false
			this.expression = ''
			this.lastOperation = null
		},
		calculate() {
			if (this.operation && !this.waitingForOperand) {
				const currentValue = parseFloat(this.displayValue)
				let result

				switch (this.operation) {
					case '+':
						result = this.previousValue + currentValue
						break
					case '-':
						result = this.previousValue - currentValue
						break
					case '*':
						result = this.previousValue * currentValue
						break
					case '/':
						result = this.previousValue / currentValue
						break
					default:
						return
				}

				this.expression =
					this.previousValue + ' ' + this.operation + ' ' + currentValue + ' ='
				this.displayValue = String(result)
				this.previousValue = result
				this.operation = null
				this.waitingForOperand = true
			}
		},
	},
})
