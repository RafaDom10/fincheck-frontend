import { FilterIcon } from '../../../../components/icons/FilterIcon'
import { SwiperSlide, Swiper } from 'swiper/react'
import { MONTHS } from '../../../../../app/config/constants'
import { SlideOptions } from './SliderOptions'
import { SliderNavigation } from './SliderNavigation'
import { formatCurrency } from '../../../../../app/utils/formatCurrency'
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon'
import { cn } from '../../../../../app/utils/cn'
import { useTransactionController } from './useTransactionController'
import { Spinner } from '../../../../components/Spinner'
import emptyStateIllustration from '../../../../../assets/empty-state.svg'
import { TransactionTypeDropdown } from './TransactionTypeDropdown'
import { FiltersModal } from './FiltersModal'
import { formatDate } from '../../../../../app/utils/formatDate'

export function Transactions() {
  const {
    areValuesIsVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters
  } = useTransactionController()

  const hasTransactions = transactions.length > 0

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">

      {isInitialLoading && (
        <div className='flex items-center justify-center w-full h-full'>
          <Spinner className='w-10 h-10' />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex)
                }}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SlideOptions
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 overflow-y-auto flex-1">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyStateIllustration} />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {(hasTransactions && !isLoading) && transactions.map(transaction => (
              <div
                key={transaction.id}
                className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="flex flex-1 items-center gap-3">
                  <CategoryIcon
                    type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                    category={transaction.category?.icon}
                  />

                  <div>
                    <strong className="text-gray-800 font-bold tracking-[-0.5px] block">
                      {transaction.name}
                    </strong>
                    <small className="text-sm text-gray-600">
                      {formatDate(new Date(transaction.date))}
                    </small>
                  </div>
                </div>
                <span className={cn(
                  'font-medium tracking-[-0.5px]',
                  transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                  !areValuesIsVisible && 'blur-[10px]'
                )}>
                  {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                  {formatCurrency(transaction.value)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}
