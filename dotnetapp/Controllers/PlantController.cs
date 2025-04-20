using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Services;
 
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlantController : ControllerBase
    {
        private readonly PlantService _plantService;
        public PlantController(PlantService plantService){
            _plantService = plantService;
        }
 
        [HttpGet]
        [Authorize(Roles = "Gardener, Customer")]
        public async Task<ActionResult<IEnumerable<Plant>>>GetAllPlants(){
            var plants =await _plantService.GetAllPlants();
            return Ok(plants);
        }
       
        [HttpGet("{plantId}")]
        [Authorize(Roles = "Gardener")]
        public async Task <ActionResult<Plant>>GetPlantById(int plantId){
            var plant=await _plantService.GetPlantById(plantId);
            if(plant==null){
                return NotFound("Cannot find any plant");
            }
            return Ok(plant);
        }
 
       [HttpPost]
       [Authorize(Roles = "Gardener")]
       public async Task<ActionResult> AddPlant([FromBody] Plant plant)
    {
        try
        {
            if (plant == null || string.IsNullOrEmpty(plant.Name) || plant.Price <= 0)
            {
                return BadRequest("Invalid plant details");
            }
 
            var nameCheck = await _plantService.AddPlant(plant);
            if (!nameCheck)
            {
                return BadRequest("A plant with this name already exists");
            }
 
            return Ok("Plant added successfully");
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred. Please try again later.");
        }
    }
 
        [HttpPut("{plantId}")]
        [Authorize(Roles = "Gardener")]
    public async Task<ActionResult> UpdatePlant(int plantId, [FromBody] Plant plant)
    {
        try
        {
            var existingPlant = await _plantService.GetPlantById(plantId);
            if (existingPlant == null)
            {
                return NotFound("Plant not found");
            }
 
            var categoryCheck = await _plantService.UpdatePlant(plantId, plant);
            if (!categoryCheck)
            {
                return BadRequest("A plant with this category already exists");
            }
 
            return Ok("Plant updated successfully");
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred. Please try again later.");
        }
    }
 
 
 
        [HttpDelete("{plantId}")]
        [Authorize(Roles = "Gardener")]
        public async Task<ActionResult> DeletePlant(int plantId)
        { try
            {
                var result = await _plantService.DeletePlant(plantId);
                if (result)
                {
                    return Ok("Plant deleted successfully");
                }
                return NotFound("Cannot find any plant");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }
    }
}