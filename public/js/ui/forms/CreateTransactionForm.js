/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();
    if (user != null) {
      const select = Account.list(user, (err, response) => {
        if (response.success) {
          const accountList = this.element.querySelector('.accounts-select');
          accountList.innerText='';
          response.data.forEach(item => {
            accountList.insertAdjacentHTML('beforeend', `<option value="${item.id}">${item.name}</option>`)
          })
        }
        else {
          if (response.error) {
            alert(response.error);
          }
        }

      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.getModal(this.element.closest('.modal').dataset.modalId).close()
        this.element.reset();
        App.update();
      }
      else {
        if (response.error) {
          alert(response.error);
        }
      }
    });
  }
}
