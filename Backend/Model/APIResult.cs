using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Threading.Tasks;

namespace API.Model
{
    public class ApiResult<T>
    {
        /// <summary>
        /// Private constructor called by the CreateAsync method.
        /// </summary>
        private ApiResult(
            List<T> data,
            int count,
            int pageIndex,
            int pageSize,
            string sortColumn,
            string sortOrder,
            string filterColumn,
            string filterQuery)
        {
            Data = data;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalCount = count;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            SortColumn = sortColumn;
            SortOrder = sortOrder;
            FilterColumn = filterColumn;
            FilterQuery = filterQuery;
        }

        #region Methods
        /// <summary>
        /// Pages, sorts and/or filters a IQueryable source.
        /// </summary>
        /// <param name="source">An IQueryable source of generic type</param>
        /// <param name="pageIndex">Zero-based current page index (0 = first page)</param>
        /// <param name="pageSize">The actual size of each page</param>
        /// <param name="sortColumn">The sorting colum name</param>
        /// <param name="sortOrder">The sorting order ("ASC" or "DESC")</param>
        /// <param name="filterColumn">The filtering column name</param>
        /// <param name="filterQuery">The filtering query (value to lookup)</param>
        /// <returns>
        /// A object containing the IQueryable paged/sorted/filtered result 
        /// and all the relevant paging/sorting/filtering navigation info.
        /// </returns>
        public static async Task<ApiResult<T>> CreateAsync(
            IQueryable<T> source,
            int pageIndex,
            int pageSize,
            string? sortColumn = null,
            string? sortOrder = null,
            string? filterColumn = null,
            string? filterQuery = null)
        {
            if (!string.IsNullOrEmpty(filterColumn)
                && !string.IsNullOrEmpty(filterQuery)
                && IsValidProperty(filterColumn))
            {
                if (filterColumn.Contains("Date"))
                {
                    var endate = Convert.ToDateTime(filterQuery);
                    endate = endate.AddDays(1);
                    String EndDateSQLparam = filterColumn + " < @0";
                    source = source.Where(EndDateSQLparam, endate);

                    var startDate = Convert.ToDateTime(filterQuery);
                    String StartDateSQLparam = filterColumn + " > @0";
                    source = source.Where(StartDateSQLparam, startDate);


                }
                else
                {
                    try
                    {
                        source = source.Where(
                            string.Format("{0}.Contains(@0)",
                            filterColumn),
                            filterQuery);
                    }
                    catch
                    {
                        source = source.Where(
                            string.Format("{0}==@0",
                            filterColumn),
                            filterQuery);
                    }
                }

            }
            var type = source.GetType();
            var hasAsync = type.GetMethod("CountAsync") != null;
            int count;
            if (hasAsync)
            {
                count = await source.CountAsync();
            }
            else
            {
                count = source.Count();
            }


            if (!string.IsNullOrEmpty(sortColumn)
                && IsValidProperty(sortColumn))
            {
                sortOrder = !string.IsNullOrEmpty(sortOrder)
                    && sortOrder.ToUpper() == "ASC"
                    ? "ASC"
                    : "DESC";
                source = source.OrderBy(
                    string.Format(
                        "{0} {1}",
                        sortColumn,
                        sortOrder)
                    );
            }

            source = source
                .Skip(pageIndex * pageSize)
                .Take(pageSize);

            // retrieve the SQL query (for debug purposes)
            // #if DEBUG
            //             {
            //                 var sql = source.ToParametrizedSql();
            //                 // do something with the sql string
            //             }
            // #endif

            type = source.GetType();
            hasAsync = type.GetMethod("ToListAsync") != null;
            List<T>? data;
            if (hasAsync)
            {
                if (source != null)
                {
                    data = await source.ToListAsync();
                }
                else
                {
                    data = new List<T>();
                }
            }
            else
            {
                data = source?.ToList();
            }
            return new ApiResult<T>(
                data ?? new List<T>(),
                count,
                pageIndex,
                pageSize,
                sortColumn ?? "",
                sortOrder ?? "",
                filterColumn ?? "",
                filterQuery ?? "");
        }

        /// <summary>
        /// Checks if the given property name exists
        /// to protect against SQL injection attacks
        /// </summary>
        public static bool IsValidProperty(
            string propertyName,
            bool throwExceptionIfNotFound = true)
        {
            var prop = typeof(T).GetProperty(
                propertyName,
                BindingFlags.IgnoreCase |
                BindingFlags.Public |
                BindingFlags.Static |
                BindingFlags.Instance);
            if (prop == null && throwExceptionIfNotFound)
                throw new NotSupportedException(
                    string.Format(
                        "ERROR: Property '{0}' does not exist.",
                        propertyName)
                    );
            return prop != null;
        }
        #endregion

        #region Properties
        /// <summary>
        /// The data result.
        /// </summary>
        public List<T> Data { get; private set; }

        /// <summary>
        /// Zero-based index of current page.
        /// </summary>
        public int PageIndex { get; private set; }

        /// <summary>
        /// Number of items contained in each page.
        /// </summary>
        public int PageSize { get; private set; }

        /// <summary>
        /// Total items count
        /// </summary>
        public int TotalCount { get; private set; }

        /// <summary>
        /// Total pages count
        /// </summary>
        public int TotalPages { get; private set; }

        /// <summary>
        /// TRUE if the current page has a previous page, FALSE otherwise.
        /// </summary>
        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 0);
            }
        }

        /// <summary>
        /// TRUE if the current page has a next page, FALSE otherwise.
        /// </summary>
        public bool HasNextPage
        {
            get
            {
                return ((PageIndex + 1) < TotalPages);
            }
        }

        /// <summary>
        /// Sorting Column name (or null if none set)
        /// </summary>
        public string SortColumn { get; set; }

        /// <summary>
        /// Sorting Order ("ASC", "DESC" or null if none set)
        /// </summary>
        public string SortOrder { get; set; }

        /// <summary>
        /// Filter Column name (or null if none set)
        /// </summary>
        public string FilterColumn { get; set; }

        /// <summary>
        /// Filter Query string 
        /// (to be used within the given FilterColumn)
        /// </summary>
        public string FilterQuery { get; set; }
        #endregion
    }
}
