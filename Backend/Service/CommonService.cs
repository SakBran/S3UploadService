using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using API.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Service
{
    public class CommonService<T> : ICommonService<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        public CommonService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Create(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public IQueryable<T> Retrieve => this._context.Set<T>();


        public async Task<int> Update(string id, T obj)
        {
            var oldData = await _context.FindAsync<T>(id);
            if (oldData != null)
            {
                _context.Entry(oldData).State = EntityState.Detached;
            }
            _context.Entry(obj).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(string id)
        {
            var temp = await _context.Set<T>().FindAsync(id);
            if (temp != null)
            {
                _context.Set<T>().Remove(temp);
            }

            return await _context.SaveChangesAsync();
        }
    }
}
