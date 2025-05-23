using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
 
namespace dotnetapp.Services
{
    public class PlantService
    {
        private readonly ApplicationDbContext _context;
 
        public PlantService(ApplicationDbContext context)
        {
            _context = context;
        }
 
        public async Task<IEnumerable<Plant>> GetAllPlants()
        {
            return await _context.Plants.ToListAsync();
        }
 
        public async Task<Plant> GetPlantById(int plantId)
        {
            return await _context.Plants.FindAsync(plantId);
        }
 
        public async Task<bool> AddPlant(Plant plant)
        {
            var existingPlant = await _context.Plants.FirstOrDefaultAsync(p => p.Name == plant.Name);
            if (existingPlant != null)
            {
                return false;
            }
           
            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();
            return true;
        }
 
        public async Task<bool> UpdatePlant(int plantId, Plant plant)
    {
        var exists1 = await _context.Plants.FindAsync(plantId);
        if (exists1 == null)
        {
            return false;
        }
      var exists2 = await _context.Plants.FirstOrDefaultAsync(c=>c.Category==plant.Category && c.PlantId!=plantId);
        if(exists2!=null){
            return false;
        }
      
       
    // if (exists1.Category == plant.Category)
    //  {
    // return false;
    // }

        exists1.Name = plant.Name;
        exists1.Category = plant.Category;
        exists1.Price = plant.Price;
        exists1.Tips = plant.Tips;
        exists1.PlantImage = plant.PlantImage;
 
        await _context.SaveChangesAsync();
        return true;
}
 
 
        public async Task<bool> DeletePlant(int plantId)
        {
            var plant = await _context.Plants.FindAsync(plantId);
            if (plant == null)
                return false;
 
            _context.Plants.Remove(plant);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}