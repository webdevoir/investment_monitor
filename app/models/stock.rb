class Stock < ApplicationRecord
  has_many :buy_entries
  has_many :sell_entries

  validates_presence_of :name, :symbol, allow_blank: false
  validates_uniqueness_of :name, :symbol

  # returns array of unique Stocks that user has interacted with (buy and/or sell)
  def self.stock_history_of(user)
    stock_ids_of_buy_entries = user.buy_entries.map(&:stock_id).uniq
    stock_ids_of_sell_entries = user.sell_entries.map(&:stock_id).uniq
    stock_ids = (stock_ids_of_buy_entries + stock_ids_of_sell_entries).uniq

    Stock.where(id: [stock_ids])
  end
end
