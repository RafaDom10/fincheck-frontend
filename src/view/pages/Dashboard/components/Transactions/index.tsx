import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { SwiperSlide, Swiper } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SlideOptions } from "./SliderOptions";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cs";
import { useTransactionController } from "./useTransactionController";
import { Spinner } from "../../../../components/Spinner";
import emptyStateIllustration from "../../../../../assets/empty-state.svg"

export function Transactions() {
  const {
    areValuesIsVisible,
    isInitialLoading,
    transactions,
    isLoading
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
          <header>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 tracking-[-0.5] font-medium">Transações</span>
                <ChevronDownIcon className="text-gray-900" />
              </button>
              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SlideOptions isActive={isActive} month={month} index={index} />
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

            {(hasTransactions && !isLoading) && (
              <>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon type="expense" />
                    <div>
                      <strong className="text-gray-800 font-bold tracking-[-0.5px] block">Almoço</strong>
                      <small className="text-sm text-gray-600">04/06/2023</small>
                    </div>
                  </div>
                  <span className={cn(
                    "text-red-800 font-medium tracking-[-0.5px]",
                    !areValuesIsVisible && 'blur-[10px]'
                  )}>
                    - {formatCurrency(1320.00)}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon type="income" />
                    <div>
                      <strong className="text-gray-800 font-bold tracking-[-0.5px] block">Freelance</strong>
                      <small className="text-sm text-gray-600">04/06/2023</small>
                    </div>
                  </div>
                  <span className={cn(
                    "text-green-800 font-medium tracking-[-0.5px]",
                    !areValuesIsVisible && 'blur-[10px]'
                  )}>
                    + {formatCurrency(1320.00)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}

    </div>
  )
}