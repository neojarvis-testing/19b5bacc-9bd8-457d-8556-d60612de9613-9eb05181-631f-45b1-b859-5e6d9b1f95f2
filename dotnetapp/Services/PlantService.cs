
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
            var existingPlant = await _context.Plants.AnyAsync(p=> p.Name == plant.Name);
            if(existingPlant){
                return false;
            }
            
            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdatePlant(int plantId, Plant plant)
        {
            var existingPlant = await _context.Plants.FindAsync(plantId);
            if (existingPlant == null) return false;
            
            var overlappingPlant = await _context.Plants.AnyAsync(p => p.Category == plant.Category && p.PlantId != plantId);
             if(overlappingPlant){
                return false;
             }


            existingPlant.Name = plant.Name;
            existingPlant.Category = plant.Category;
            existingPlant.Price = plant.Price;
            existingPlant.Tips = plant.Tips;
            existingPlant.PlantImage = plant.PlantImage;            
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
  