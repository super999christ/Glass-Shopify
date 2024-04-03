import { searchOrders } from "@root/apis/orders";
import LoadingBar from "@root/components/LoadingBar";
import { AuthContext } from "@root/providers/AuthProvider";
import { logout } from "@root/utils/auth";
import { formatDate, formatUSDPrice } from "@root/utils/format";
import { useContext, useEffect, useState } from "react";

export default function OrdersPage() {
  const { merchant } = useContext(AuthContext);
  const [keyword, setKeyword] = useState('');
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchOrders(keyword)
      .then(res => {
        setOrders(res);
      })
      .catch(err => {
        console.log("Error while searching orders: ", err);
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [keyword]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          <a href={"https://" + merchant?.storeUrl} target="_blank">{merchant?.storeName}</a>
        </h2>
      </div>

      <div className="my-4 sm:mx-auto sm:w-full sm:max-w-[960px]">
        <div className="bg-white px-6 py-2 shadow sm:rounded-lg sm:px-12">
          <div className="flex flex-col text-[14px]">
            <div className="p-2 my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden mb-2">
                  <div className="min-w-full flex items-center justify-between px-8">
                    <div className="font-semibold text-lg flex gap-2">
                      Order history
                      {isLoading && <LoadingBar />}
                    </div>
                    <div className="flex items-center w-[450px]">
                      <label htmlFor="voice-search" className="sr-only">Search</label>
                      <div className="relative w-full">
                        <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Search by order number or product name, sku or barcode ..." required

                          value={keyword}
                          onChange={e => setKeyword(e.target.value)} />
                        <div className="flex absolute inset-y-0 right-2 items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200 table-fixed border-collapse border border-solid">
                  <thead className="bg-gray-50  text-white w-full">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 h-[40px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[14%]"
                      >
                        Order
                      </th>
                      <th
                        scope="col"
                        className="px-6 h-[40px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[14%]"
                      >
                        DATE
                      </th>
                      <th
                        scope="col"
                        className="px-6 h-[40px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[14%]"
                      >
                        PAYMENT STATUS
                      </th>
                      <th
                        scope="col"
                        className="px-6 h-[40px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[14%]"
                      >
                        FULFILLMENT STATUS
                      </th>
                      <th
                        scope="col"
                        className="px-6 h-[40px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[28%]"
                      >
                        Order Items
                      </th>
                      <th
                        scope="col"
                        className="px-6 h-[40px] text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[14%]"
                      >
                        TOTAL
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-grey-light overflow-y-scroll w-full">
                    {orders
                      .map(({ order_number, created_at, financial_status, fulfillment_status, subtotal_price, line_items }) => (
                        <tr key={order_number} className="h-[40px]">
                          <td className="px-6 h-[40px] whitespace-nowrap ">
                            <div className="flex items-center">
                              <div className="border p-1 text-sm font-medium text-gray-900">{'#' + order_number}</div>
                            </div>
                          </td>
                          <td className="px-6 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-semibold">
                              {formatDate(created_at)}
                            </div>
                          </td>
                          <td className="px-6 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-semibold">{financial_status}</div>
                          </td>
                          <td className="px-6 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">{fulfillment_status}</div>
                          </td>
                          <td className="px-6 whitespace-nowrap">
                            {(line_items as any[]).map(item => (
                              <div>
                                <div className="text-sm text-gray-700">
                                  <div className="font-medium">Name:</div> {item.name}
                                </div>
                                <div className="text-sm text-gray-700">
                                  <div className="font-medium">Sku:</div> {item.sku}
                                </div>
                              </div>
                            ))}
                          </td>
                          <td className="px-6 whitespace-nowrap text-sm text-gray-800 text-right font-semibold">
                            {formatUSDPrice(subtotal_price)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="flex w-full max-w-40 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        onClick={logout}
      >
        Sign out
      </button>
    </div>
  );
}