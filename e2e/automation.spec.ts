import { test, expect } from '@playwright/test';

test('Verify the title, title description and Local timezone entry', async ({ page }) => {
  await page.goto('localhost:3000');
  // Confirm title of the page
  await page.title()
  await expect(page).toHaveTitle('Time Keeper');
  //Confirm title description of the app
  const titleDesc = await page.locator("//*[@class='sm:flex-auto']/p").textContent()
  await expect(titleDesc).toEqual("This app helps you keep track of your friends’ timezones!")
  //Confirm the availablity of Local(you) timezone
  const labelColumn = await page.locator("//*[@class= 'min-w-full divide-y divide-gray-300']/tbody/tr/td/div").textContent()
  await expect(labelColumn).toEqual("Local(You)")
})

test('Verify presence of table columns such as Label, Timezone, Local Time, Delete', async({ page })=>{
  await page.goto('localhost:3000')
  const tztable = await page.locator("//*[@class='min-w-full divide-y divide-gray-300']/thead/tr/th")
  let tztableCount = await tztable.count()
  for(var i=0; i<tztableCount; i++){
    const text = await tztable.nth(i).dblclick()
    await page.waitForTimeout(1000)
  }
})


test('Verify the Add Timezone button enabled or not', async ({ page })=>{
  await page.goto('localhost:3000')
  await expect(page.getByRole('button',{ name : "Add timezone"} )).toBeEnabled()
  await page.getByRole('button',{ name : "Add timezone"} ).click()
})


 test("Add, Verify and Delete the timezone entries ", async({ page })=>{
  //open URL
  await page.goto('localhost:3000')   
  // To fetch number of timezones                               
  await page.getByRole('button',{ name : "Add timezone"} ).click()   
  const timezone = await page.locator("#timezone > option")          
  const timezoneCount = await timezone.count()                       
  let labelList = []
  await page.reload()
  //Add and Save entries for each timezone
  for (let i=1; i<timezoneCount; i++){
    await page.getByRole('button',{ name : "Add timezone"} ).click()    
    const timezoneText = await timezone.nth(i).textContent()            
    labelList.push(`${timezoneText}`)
    var label = await page.locator("#label").fill(`${timezoneText}`)                    
    await page.locator("[name='timezone']").selectOption(`${timezoneText}`)    
    await page.getByText('Save').click()                                      
    await page.waitForTimeout(1000)
  }
  // To fetch total number of entries(rows) in the table
  const row = await page.locator('//*[@class="min-w-full divide-y divide-gray-300"]/tbody/tr')               
  const rowCount = await row.count()                                                                         
  
  //To validate avaibality of all entries processed above
  if(labelList.length+1 === rowCount){
    console.log('Number of timezone entries are valid!')
  }

  //Delete the entries in the order which was added above
  const delt = await page.locator('//*[@class="min-w-full divide-y divide-gray-300"]/tbody/tr/td[4]/button')         // TOTAL DELETE
  for(let j=0;j<labelList.length;j++){
    const labelText = await page.locator('//*[@class="min-w-full divide-y divide-gray-300"]/tbody/tr/td[1]').allTextContents()   // label text
    let labelindex = labelText.indexOf(labelList[j]);
    //To validate the visibility of Delete button. Skip the delete if not availabe Eg: Local(you)
    if(await delt.nth(labelindex).isVisible()){
      await delt.nth(labelindex).click()
      await page.waitForTimeout(1000)
    }
  }

  //To reload and validate the availabilty of loacal timezone
  await page.reload()
  const labelColumn = await page.locator("//*[@class= 'min-w-full divide-y divide-gray-300']/tbody/tr/td/div").textContent()
  await expect(labelColumn).toEqual("Local(You)")
  await page.pause()
})